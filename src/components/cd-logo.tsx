import * as React from "react";
import cx from "clsx";
import { VisuallyHidden } from "@reach/visually-hidden";
const styles = require("./cd-logo.module.scss");

export interface CDLogoProps extends React.ComponentPropsWithoutRef<"span"> {
	alt?: boolean;
	color?: "white" | "black";
	noMargin?: boolean;
	size?: "small" | "tiny";
}

const CDLogo: React.FC<CDLogoProps> = ({
	alt,
	className,
	color,
	noMargin,
	size,
	...props
}) => {
	return (
		<span
			className={cx(styles.logo, className, {
				[styles["logo--alt"]]: alt,
				[styles["logo--noMargin"]]: noMargin,
				[styles[`logo--${color}`]]: color,
				[styles[`logo--${size}`]]: size,
			})}
			aria-hidden
			{...props}
		>
			<VisuallyHidden>Chance Digital</VisuallyHidden>
		</span>
	);
};

export default CDLogo;
