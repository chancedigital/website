import React, { useState } from "react";
import cx from "clsx";
import { useId } from "@reach/auto-id";
import Link from "$components/link";
import TopNav from "$components/top-nav";
import MenuToggle from "$components/menu-toggle";
import { VisuallyHidden } from "@reach/visually-hidden";
import { getScrollPosition } from "$lib/utils";
const styles = require("./header.module.scss");

export interface ScrollPosition {
	x: number;
	y: number;
}

export interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
	siteTitle: string;
	isHome?: boolean;
}

const SiteTitle: React.FC = () => {
	return (
		<React.Fragment>
			<img
				src="/img/logos/logo-long-box-color.svg"
				aria-hidden
				alt="Chance Digital logo"
			/>
			<VisuallyHidden>Chance Digital</VisuallyHidden>
		</React.Fragment>
	);
};

function shouldStick(position: ScrollPosition, threshold: number) {
	return position.y > threshold;
}

function useHeaderIsSticky(threshold = 180) {
	const [isSticky, setIsSticky] = React.useState<boolean>(false);
	const isStickyRef = React.useRef(isSticky);
	React.useEffect(() => {
		isStickyRef.current = isSticky;
	});

	React.useEffect((): any => {
		let requestRunning: any = null;
		function handleScroll() {
			if (requestRunning == null) {
				requestRunning = window.requestAnimationFrame(checkForStickyHeader);
			}
		}

		function checkForStickyHeader() {
			const shouldBeSticky = shouldStick(getScrollPosition(), threshold);
			if (shouldBeSticky && !isStickyRef.current) {
				setIsSticky(true);
			} else if (!shouldBeSticky && isStickyRef.current) {
				setIsSticky(false);
			}
			requestRunning = null;
		}

		checkForStickyHeader();
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.cancelAnimationFrame(requestRunning);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [threshold]);

	return isSticky;
}

const Header: React.FC<HeaderProps> = ({
	className,
	siteTitle,
	isHome = false,
	...props
}) => {
	const [menuIsActive, setMenuActive] = useState<boolean>(false);
	const LogoWrapper = isHome ? "div" : "h1";
	const navId = `top-nav-${useId()}`;
	return (
		<header
			id="site-header"
			className={cx(styles.base, className, {
				[styles["base--sticky"]]: useHeaderIsSticky(),
			})}
			{...props}
		>
			<LogoWrapper className={styles.logo}>
				{isHome ? (
					<SiteTitle />
				) : (
					<Link href="/">
						<SiteTitle />
					</Link>
				)}
			</LogoWrapper>
			<div className={styles.navWrapper}>
				<MenuToggle
					className={styles.menuToggle}
					onClick={() => setMenuActive(!menuIsActive)}
					menuIsActive={menuIsActive}
					navId={navId}
				/>
				<TopNav className={styles.nav} menuIsActive={menuIsActive} id={navId} />
			</div>
		</header>
	);
};

export { Header };
export default Header;
