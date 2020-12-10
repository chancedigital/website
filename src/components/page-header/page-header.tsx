import React from "react";
import cx from "clsx";
import Button from "$components/button";
const styles = require("./page-header.module.scss");

export interface PageHeaderProps
	extends React.ComponentPropsWithoutRef<"section"> {
	buttonHref?: string;
	buttonOnClick?: (
		event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
	buttonText?: string;
	fullHeight?: boolean;
	innerContent: string;
	renderImage?: (props: any) => any;
	title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
	buttonHref,
	buttonOnClick,
	buttonText,
	className,
	fullHeight,
	innerContent,
	renderImage,
	title,
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
				<div className={styles.content}>
					<div>
						<h1 className={styles.title}>{title}</h1>
						<p className={styles.subTitle}>{innerContent}</p>
						{buttonText && (buttonHref || buttonOnClick) ? (
							<Button
								className={styles.cta}
								href={buttonHref}
								htmlType="button"
								onClick={buttonOnClick}
								onBackgroundColor="xlight-gray"
							>
								{buttonText}
							</Button>
						) : null}
					</div>
					{renderImage
						? renderImage({ className: styles.image })
						: null}
				</div>
			</div>
		</div>
	);
};

export default PageHeader;
