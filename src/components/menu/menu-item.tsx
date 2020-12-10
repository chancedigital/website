import React from "react";
import cx from "clsx";
const styles = require("./menu.module.scss");

export interface MenuItemProps {
	className?: string;
	children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<li className={cx(styles.item, className)} {...props}>
			{children}
		</li>
	);
};

export default MenuItem;
