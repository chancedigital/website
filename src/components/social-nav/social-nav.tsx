import React from "react";
import cx from "clsx";
import { VisuallyHidden } from "@reach/visually-hidden";
import Icon from "$components/icon";
const styles = require("./social-nav.module.scss");

export interface SocialNavProps extends React.ComponentPropsWithoutRef<"nav"> {}

const MENU_ITEMS = [
	{
		property: "Twitter",
		url: "https://twitter.com/chancethedev",
	},
	// {
	// 	property: "Instagram",
	// 	url: "https://www.instagram.com/chancethedev",
	// },
	{
		property: "LinkedIn",
		url: "https://www.linkedin.com/in/chaance",
	},
	{
		property: "GitHub",
		url: "https://github.com/chaance",
	},
	{
		property: "CodePen",
		url: "https://codepen.io/chancethedev",
	},
];

const SocialNav: React.FC<SocialNavProps> = ({ className }) => {
	return (
		<nav className={cx(styles.nav, className)} aria-label="Social media links">
			<ul className={styles.menu}>
				{MENU_ITEMS.map(({ property, url }) => {
					const SocialIcon = Icon[property];
					return (
						<li key={property} className={styles.item}>
							<a href={url} className={styles.link}>
								<VisuallyHidden>{property}</VisuallyHidden>
								<SocialIcon className={styles.icon} />
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default SocialNav;
