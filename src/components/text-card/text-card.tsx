import React from "react";
import cx from "clsx";
const styles = require("./text-card.module.scss");

export interface TextCardProps
	extends React.ComponentPropsWithoutRef<"section"> {
	heading: string;
	content: string;
}

export const TextCard: React.FC<TextCardProps> = ({
	className,
	content,
	heading,
	...props
}) => {
	return (
		<div className={cx(styles.base, className)} {...props}>
			<h3 className={styles.heading}>{heading}</h3>
			<p className={styles.content}>{content}</p>
		</div>
	);
};

export default TextCard;
