import * as React from "react";
import { NextSeo as SEO } from "next-seo";
import { PageComponent } from "$lib/types";

const Success: PageComponent<SuccessProps> = () => {
	return (
		<React.Fragment>
			<SEO title="Client Billing: Success!" />
			<section className="container basic-photo">
				<div>
					<h1>GREAT WORK</h1>
				</div>
			</section>
		</React.Fragment>
	);
};

type SuccessProps = {};

export default Success;
