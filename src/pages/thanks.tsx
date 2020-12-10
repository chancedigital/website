import * as React from "react";
import PageHeader from "$components/page-header";
import { NextSeo as SEO } from "next-seo";
import { PageComponent } from "$lib/types";
// const styles = require("./thanks.module.scss");

const Thanks: PageComponent<ThanksProps> = () => {
	return (
		<React.Fragment>
			<SEO
				title="Thank You"
				description="We can't wait to see how we can help! We'll review and get back to you within one business day."
			/>
			<PageHeader
				buttonHref="/"
				buttonText="Go Back Home"
				fullHeight={true}
				title="Thanks a ton!"
				innerContent="We can't wait to see how we can help! We'll review and get back to you within one business day."
			/>
		</React.Fragment>
	);
};

interface ThanksProps {}

export default Thanks;
