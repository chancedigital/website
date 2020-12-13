import * as React from "react";
import cx from "clsx";
const styles = require("./basic-section.module.scss");

export interface BasicSectionProps
	extends React.ComponentPropsWithRef<"section"> {}

export interface BasicSectionInnerProps
	extends React.ComponentPropsWithRef<"div"> {}

export interface BasicSectionHeadingProps
	extends React.ComponentPropsWithRef<"h2"> {}

const BasicSection = React.forwardRef<HTMLElement, BasicSectionProps>(
	({ className, ...props }, ref) => {
		return (
			<section className={cx(styles.section, className)} {...props} ref={ref} />
		);
	}
);

const BasicSectionInner = React.forwardRef<
	HTMLDivElement,
	BasicSectionInnerProps
>(({ className, ...props }, ref) => {
	return (
		<div className={cx(styles.container, className)} {...props} ref={ref} />
	);
});

const BasicSectionHeading = React.forwardRef<
	HTMLHeadingElement,
	BasicSectionHeadingProps
>(({ className, ...props }, ref) => {
	// eslint-disable-next-line jsx-a11y/heading-has-content
	return <h2 className={cx(styles.heading, className)} {...props} ref={ref} />;
});

export { BasicSection, BasicSectionInner, BasicSectionHeading };
