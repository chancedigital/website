import React from "react";
import cx from "clsx";
import Button from "$components/button";
const styles = require("./page-header.module.scss");

export interface PageHeaderProps
	extends React.ComponentPropsWithoutRef<"section"> {
	fullHeight?: boolean;
	clamped?: boolean;
	innerClassName?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
	className,
	fullHeight,
	clamped,
	title,
	children,
	innerClassName,
	...props
}) => {
	return (
		<div
			className={cx(styles.header, className, {
				[styles["header--fullHeight"]]: fullHeight,
			})}
			{...props}
		>
			<div className={styles.container}>
				<div
					className={cx(styles.content, innerClassName, {
						[styles["content--clamped"]]: clamped,
					})}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

const PageTitle: React.FC<{ className?: string }> = ({
	children,
	className,
	...props
}) => {
	return (
		<h1 className={cx(styles.title, className)} {...props}>
			{children}
		</h1>
	);
};

const PageSubtitle: React.FC<{ className?: string }> = ({
	children,
	className,
	...props
}) => {
	return (
		<p className={cx(styles.subTitle, className)} {...props}>
			{children}
		</p>
	);
};

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

const PageHeaderButton: React.FC<{
	href?: ButtonProps["href"];
	onClick?: ButtonProps["onClick"];
	className?: ButtonProps["className"];
}> = ({ children, className, ...props }) => {
	return (
		<Button
			className={cx(styles.cta, className)}
			htmlType="button"
			onBackgroundColor="xlight-gray"
			{...props}
		>
			{children}
		</Button>
	);
};

const PageHeaderImage: React.FC<{
	children:
		| React.ReactNode
		| ((props: { className: string | undefined }) => React.ReactNode);
}> = ({ children }) => {
	return (
		<React.Fragment>
			{typeof children === "function"
				? (children as any)({ className: styles.image })
				: children}
		</React.Fragment>
	);
};

export {
	PageHeader,
	PageHeaderButton,
	PageTitle,
	PageSubtitle,
	PageHeaderImage,
};

export default PageHeader;
