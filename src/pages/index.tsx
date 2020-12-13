import * as React from "react";
import Capabilities from "$components/capabilities";
import Tools from "$components/tools";
import {
	PageHeader,
	PageTitle,
	PageSubtitle,
	PageHeaderImage,
	PageHeaderButton,
} from "$components/page-header";
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
			<PageHeader fullHeight innerClassName={styles.headerContent}>
				<div>
					<PageTitle>Modern development for the modern web</PageTitle>
					<PageSubtitle>
						We create high-impact websites and apps that drive user engagement
						and leave a lasting impression for your audience.
					</PageSubtitle>
					<PageHeaderButton href="/contact">Get In Touch</PageHeaderButton>
				</div>
				<PageHeaderImage>
					{({ className }) => <MacDrawing className={className} />}
				</PageHeaderImage>
			</PageHeader>
			<Capabilities id="capes" />
			<Tools id="tools" />
			<CTABlock />
		</React.Fragment>
	);
};

export default Homepage;

interface HomepageProps {}
