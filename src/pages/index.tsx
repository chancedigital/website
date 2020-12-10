import * as React from "react";
import cx from "clsx";
import Capabilities from "$components/capabilities";
import Tools from "$components/tools";
import PageHeader from "$components/page-header";
import MacDrawing from "$components/mac-drawing";
import CTABlock from "$components/cta-block";
import { NextSeo as SEO } from "next-seo";
import { PageComponent } from "$lib/types";
const styles = require("./index.module.scss");

const Homepage: PageComponent<HomepageProps> = () => {
	return (
		<React.Fragment>
			<SEO
				title="Modern Development for the Modern Web"
				description="We create high-impact websites and apps that drive user engagement and leave a lasting impression for your audience."
			/>
			<PageHeader
				buttonHref="/contact"
				buttonText="Get In Touch"
				className={`${styles.homePage}__pageHeader`}
				fullHeight={true}
				title="Modern development for the modern web"
				innerContent="We create high-impact websites and apps that drive user engagement and leave a lasting impression for your audience."
				renderImage={({ className }) => {
					return (
						<MacDrawing
							className={cx(`${styles.homePage}__drawing`, className)}
						/>
					);
				}}
			/>
			<Capabilities id="capes" />
			<Tools id="tools" />
			<CTABlock />
		</React.Fragment>
	);
};

export default Homepage;

interface HomepageProps {}
