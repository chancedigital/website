import * as React from "react";
import cx from "clsx";
import Link from "$components/link";
const styles = require("./button.module.scss");

export interface ButtonProps {
	className?: string;
	onBackgroundColor?: "light-gray" | "xlight-gray";
	color?: string;
	disabled?: boolean;
	element?: "button" | "span" | "div";
	href?: string;
	htmlType?: "button" | "submit" | "reset";
	loading?: boolean;
	onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	rel?: string;
	size?: string;
	target?: "_blank";
	wobble?: boolean;
	[key: string]: any;
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
	(
		{
			children,
			className,
			color,
			onBackgroundColor,
			disabled = false,
			element = "button",
			href,
			htmlType = "button",
			loading = false,
			onClick,
			rel: relProp,
			size,
			target,
			wobble,
			...rest
		},
		ref
	) => {
		// Compose classnames
		const classNames = cx(styles.button, className, {
			[styles[`button--${size}`]]: size,
			[styles[`button--${color}`]]: color,
			[styles[`button--on-bg-${onBackgroundColor}`]]: onBackgroundColor,
			[styles["button--loading"]]: loading,
			[styles["button--disabled"]]: disabled,
			[styles["button--wobble"]]: wobble,
		});

		// Check for loading state before firing a click handler
		const handleClick = (
			e: React.MouseEvent<HTMLButtonElement, MouseEvent>
		) => {
			if (loading) {
				e.preventDefault();
				return;
			}
			onClick && onClick(e);
		};

		// Determine the element to use for non-link buttons
		// Anything with a click handler will use a `button` tag
		let NonLinkEl = element;
		let htmlButtonProps: any = {};
		if (onClick) {
			NonLinkEl = "button";
			htmlButtonProps = {
				disabled: disabled || undefined,
				onClick: handleClick,
				type: htmlType,
			};
		}

		// Determine which props to pass to non-link buttons
		const nonLinkProps = {
			className: classNames,
			...htmlButtonProps,
			...rest,
		};

		// Determine which props to pass to link buttons
		const linkProps: React.ComponentProps<typeof Link> = {
			className: classNames,
			rel: relProp || target === "_blank" ? "noopener noreferrer" : undefined,
			target,
			"aria-disabled": disabled || undefined,
			href,
			...rest,
		};

		const inner = <span className={styles.inner}>{children}</span>;

		return href ? (
			<Link ref={ref as any} {...linkProps}>
				{inner}
			</Link>
		) : (
			<NonLinkEl ref={ref as any} {...nonLinkProps}>
				{inner}
			</NonLinkEl>
		);
	}
);

export { Button };
export default Button;
