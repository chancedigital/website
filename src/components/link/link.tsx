/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { Link as LinkPrimitive } from "$components/primitives/link";
export type LinkProps = React.ComponentProps<typeof LinkPrimitive>;
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
	{ ...props },
	forwardedRef
) {
	return <LinkPrimitive ref={forwardedRef} {...props} />;
});
Link.displayName = "Link";
export { Link };
export default Link;
