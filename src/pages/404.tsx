import * as React from "react";
import { NextSeo as SEO } from "next-seo";
import {
	PageHeader,
	PageTitle,
	PageSubtitle,
	PageHeaderButton,
} from "$components/page-header";
import { PageComponent } from "$lib/types";
// const styles = require("./404.module.scss");

const Error404: PageComponent<Error404Props> = () => {
	return (
		<React.Fragment>
			<SEO title="404: Danger!" />
			<PageHeader fullHeight clamped>
				<div>
					<PageTitle>404: Danger!</PageTitle>
					<PageSubtitle>
						You can clearly predict the future, as you've landed on a page that
						hasn't yet been created. Well done.
					</PageSubtitle>
					<PageHeaderButton href="/">Go Back Home</PageHeaderButton>
				</div>
			</PageHeader>
		</React.Fragment>
	);
};

interface Error404Props {}

export default Error404;
