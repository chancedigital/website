/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import pick from "lodash/pick";
import omit from "lodash/omit";
import isString from "lodash/isString";
import { useRouter } from "next/router";

let nextPropNames = [
	"href",
	"as",
	"replace",
	"scroll",
	"shallow",
	"prefetch",
] as const;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
	{ children, ...props },
	ref
) {
	let isExternalLink = isString(props.href) && props.href.startsWith("http");
	let isAnchorLinkWithoutRoute =
		isString(props.href) && props.href.startsWith("#");
	let NextLinkComponent = isAnchorLinkWithoutRoute ? AnchorLink : NextLink;

	return isExternalLink ? (
		<a {...omit(props, nextPropNames)} ref={ref} href={props.href as string}>
			{children}
		</a>
	) : (
		<NextLinkComponent passHref {...pick(props, nextPropNames)}>
			<a {...omit(props, nextPropNames)} ref={ref}>
				{children}
			</a>
		</NextLinkComponent>
	);
});

const AnchorLink: React.FC<NextLinkProps> = ({ ...props }) => {
	const router = useRouter();
	return <NextLink {...props} href={router.pathname + props.href} />;
};

Link.displayName = "Link";

type LinkDOMProps = Omit<
	React.ComponentPropsWithRef<"a">,
	typeof nextPropNames[number]
> &
	Pick<NextLinkProps, typeof nextPropNames[number]>;
type LinkOwnProps = {};
type LinkProps = LinkDOMProps & LinkOwnProps;

export type { LinkDOMProps, LinkOwnProps, LinkProps };
export { Link };
