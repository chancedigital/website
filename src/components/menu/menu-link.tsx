import React from "react";
import cx from "clsx";
import Link from "$components/link";
const styles = require("./menu.module.scss");

export interface MenuLinkProps
	extends Omit<React.ComponentProps<typeof Link>, "onClick" | "href"> {
	href?: string;
	redirect?: string;
	onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const MenuLink: React.FC<MenuLinkProps> = ({
	className,
	href,
	target,
	onClick,
	rel: relProp,
	redirect,
	type = "button",
	children,
	...props
}) => {
	const classNames = cx(styles.link, className, {
		[styles["link--button"]]: onClick != null,
	});
	const rel =
		relProp || target === "_blank" ? "noopener noreferrer" : undefined;

	if (onClick != null) {
		return (
			<button
				className={classNames}
				onClick={onClick}
				type={type as any}
				{...(props as any)}
			>
				{children}
			</button>
		);
	}
	if (href) {
		return (
			<Link
				className={classNames}
				href={href}
				target={target}
				rel={rel}
				{...(props as any)}
			>
				{children}
			</Link>
		);
	}
	return <span {...props}>{children}</span>;
};

export default MenuLink;
