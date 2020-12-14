import React from "react";
import cx from "clsx";
const styles = require("./icon-with-hover-label.module.scss");

export interface IconWithHoverLabelProps
	extends React.ComponentPropsWithoutRef<"figure"> {
	label: string;
	imgAlt: string;
	imgSrc: string;
}

export const IconWithHoverLabel: React.FC<IconWithHoverLabelProps> = ({
	className,
	label,
	imgAlt,
	imgSrc,
	...props
}) => {
	return (
		<figure className={cx(styles.icon, className)} {...props}>
			<img className={styles.img} src={imgSrc} alt={imgAlt} />
			<figcaption className={styles.label}>{label}</figcaption>
		</figure>
	);
};

export default IconWithHoverLabel;
