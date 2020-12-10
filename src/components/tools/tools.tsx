import React from "react";
import cx from "clsx";
import IconWithHoverLabel from "$components/icon-with-hover-label";
import { useId } from "@reach/auto-id";
const styles = require("./tools.module.scss");

const ICONS = [
	{
		label: `JavaScript`,
		imgSrc: `/img/logo-javascript.svg`,
	},
	{
		label: `React`,
		imgSrc: `/img/logo-react.svg`,
	},
	{
		label: `Vue JS`,
		imgSrc: `/img/logo-vue.svg`,
	},
	{
		label: `Next JS`,
		imgSrc: `/img/logo-next-js.svg`,
	},
	{
		label: `Webpack`,
		imgSrc: `/img/logo-webpack.svg`,
	},
	{
		label: `Sass`,
		imgSrc: `/img/logo-sass.svg`,
	},
	{
		label: `WordPress`,
		imgSrc: `/img/logo-wordpress.svg`,
	},
	{
		label: `Laravel`,
		imgSrc: `/img/logo-laravel.svg`,
	},
	{
		label: `PHP`,
		imgSrc: `/img/logo-php.svg`,
	},
];

export interface ToolsProps extends React.ComponentPropsWithoutRef<"section"> {}

const Tools: React.FC<ToolsProps> = ({ className, ...props }) => {
	const titleId = `tools-${useId()}`;
	return (
		<section
			aria-labelledby={titleId}
			className={cx(styles.tools, className)}
			{...props}
		>
			<div className={styles.container}>
				<h2 id={titleId} className={styles.heading}>
					Tools of the Trade
				</h2>
				<ul className={styles.list}>
					{ICONS.map((icon) => (
						<li key={icon.label} className={styles.item}>
							<IconWithHoverLabel
								{...icon}
								imgAlt={`${icon.label} logo`}
								className={styles.icon}
								tabIndex={0}
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default Tools;
