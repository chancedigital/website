import React from "react";
import cx from "clsx";
import { VisuallyHidden } from "@reach/visually-hidden";
const styles = require("./menu-toggle.module.scss");

export interface MenuToggleProps
	extends React.ComponentPropsWithoutRef<"button"> {
	menuIsActive: boolean;
	onClick(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
	navId: string;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({
	className,
	menuIsActive,
	onClick,
	navId,
}) => {
	return (
		<div
			className={cx(styles.base, className, {
				[styles["base--active"]]: menuIsActive,
			})}
		>
			<button
				className={cx(styles.button, {
					[styles["button--active"]]: menuIsActive,
				})}
				type="button"
				onClick={onClick}
				aria-expanded={menuIsActive}
				aria-controls={navId}
			>
				{[1, 2, 3].map((_, i) => (
					<span
						key={i}
						className={cx(styles.line, {
							[styles["line--active"]]: menuIsActive,
						})}
						aria-hidden
					/>
				))}
				<VisuallyHidden>Toggle Navigation</VisuallyHidden>
			</button>
		</div>
	);
};

export default MenuToggle;
