import * as React from "react";
import {
	PageHeader,
	PageTitle,
	PageSubtitle,
	PageHeaderButton,
} from "$components/page-header";
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
			<PageHeader fullHeight clamped>
				<div>
					<PageTitle>Thanks a ton!</PageTitle>
					<PageSubtitle>
						We can't wait to see how we can help! We'll review and get back to
						you within one business day.
					</PageSubtitle>
					<PageHeaderButton href="/">Go Back Home</PageHeaderButton>
				</div>
			</PageHeader>
		</React.Fragment>
	);
};

interface ThanksProps {}

export default Thanks;
