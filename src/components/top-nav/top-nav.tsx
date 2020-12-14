import React, { useRef } from "react";
import cx from "clsx";
import { useSpring, animated } from "react-spring";
import { Menu, MenuItem, MenuLink } from "$components/menu";
import { useMeasure } from "$lib/utils/use-measure";
import { useBreakpoint } from "$lib/utils/use-breakpoint";
import { usePrefersReducedMotion, usePrevious } from "@chance/hooks";
import { VisuallyHidden } from "@reach/visually-hidden";
const styles = require("./top-nav.module.scss");

export interface TopNavProps extends React.ComponentPropsWithoutRef<"nav"> {
	menuIsActive: boolean;
}

const navItems: MenuItemData[] = [
	{
		label: "How We Can Help",
		href: "/#capes",
		options: {
			isHashLink: true,
		},
	},
	{
		label: "Tools We Use",
		href: "/#tools",
		options: {
			isHashLink: true,
		},
	},
	{
		label: `Let's Talk`,
		href: "/contact",
	},
].map((item, i) => ({
	...item,
	id: i + 1,
}));

const TopNav: React.FC<TopNavProps> = ({ children, className, ...props }) => {
	const navRef = useRef<HTMLDivElement>(null);
	const prefersReducedMotion = usePrefersReducedMotion(navRef);
	const togglable = useBreakpoint('large', { dir: "down" });
	const shouldAnimate = togglable && !prefersReducedMotion;
	const commonProps = {
		"aria-label": "Site navigation",
		className: cx(styles.nav, className, {
			[styles["nav--active"]]: props.menuIsActive,
			animated: shouldAnimate,
		}),
		ref: navRef,
		children: (
			<TopNavMenu isActive={props.menuIsActive} togglable={togglable} />
		),
		...props,
	};

	return shouldAnimate ? (
		<TopNavAnimated {...commonProps} />
	) : (
		<TopNavStatic {...commonProps} togglable={togglable} />
	);
};

const TopNavStatic = React.forwardRef<
	HTMLElement,
	TopNavProps & { togglable: boolean }
>(({ menuIsActive, togglable, ...props }, ref) => {
	return (
		<nav
			ref={ref}
			style={
				togglable
					? {
							height: menuIsActive ? "auto" : 0,
							overflow: "hidden",
					  }
					: undefined
			}
			{...props}
		/>
	);
});

const TopNavAnimated = React.forwardRef<HTMLElement, TopNavProps>(
	({ menuIsActive, children, ...props }, ref) => {
		const menuWrapper = useRef<HTMLDivElement>(null);
		const { height: viewHeight } = useMeasure(menuWrapper);
		const prevMenuActiveState = usePrevious(menuIsActive);
		const shouldUseAutoHeight = !!(
			menuIsActive && prevMenuActiveState === menuIsActive
		);
		const { height, transform } = useSpring<any>({
			from: {
				height: menuIsActive ? 0 : viewHeight,
				transform: "translate3d(0,-20px,0)",
			},
			to: {
				height: menuIsActive ? viewHeight : 0,
				transform: `translate3d(0,${menuIsActive ? 0 : `${-20}px`},0)`,
			},
		});

		// Nav style for animations
		let navStyle = {};
		let navHeight = height;

		// Active menu
		if (shouldUseAutoHeight) {
			navHeight = "auto";
		}

		navStyle = { height: navHeight, overflow: "hidden" };

		return (
			<animated.nav style={navStyle} ref={ref} {...props}>
				<animated.div style={{ transform }} ref={menuWrapper}>
					{children}
				</animated.div>
			</animated.nav>
		);
	}
);

const TopNavMenu: React.FC<{ isActive: boolean; togglable: boolean }> = (
	props
) => {
	return (
		<Menu
			className={styles.menu}
			isActive={props.isActive}
			togglable={props.togglable}
		>
			{navItems.map((item) => {
				const { id, href, options = {}, onClick, redirect } = item;
				const { hideLabel, target } = options;

				return (
					<MenuItem className={styles.item} key={id}>
						<MenuLink
							className={styles.link}
							onClick={onClick}
							redirect={redirect}
							href={href}
							target={target}
							tabIndex={props.togglable ? -1 : 0}
						>
							{hideLabel ? (
								<VisuallyHidden>{item.label}</VisuallyHidden>
							) : (
								item.label
							)}
						</MenuLink>
					</MenuItem>
				);
			})}
		</Menu>
	);
};

export default TopNav;

interface MenuItemData {
	id: string | number;
	href?: string;
	label: string;
	options?: {
		target?: string;
		className?: string;
		hideLabel?: boolean;
		isHashLink?: boolean;
	};
	redirect?: string;
	onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}
