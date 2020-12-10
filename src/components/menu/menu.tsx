import React from "react";
import cx from "clsx";
import MenuLink from "./menu-link";
import MenuItem from "./menu-item";
const styles = require("./menu.module.scss");

export interface MenuItemData {
	id: string | number;
	href?: string;
	label: string;
	options?: {
		target?: string;
		className?: string;
		hideLabel?: boolean;
		isHashLink?: boolean;
	};
	children?: MenuItemData[];
	redirect?: string;
	onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export interface MenuProps {
	className?: string;
	togglable?: boolean;
	isActive?: boolean;
}

const Menu: React.FC<MenuProps> = ({
	className,
	togglable,
	isActive,
	children,
	...props
}) => {
	return (
		<ul className={cx(styles.base, className)} {...props}>
			{children}
		</ul>
	);
};

export default Menu;
export { Menu, MenuLink, MenuItem };
