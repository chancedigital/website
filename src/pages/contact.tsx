import * as React from "react";
import {
	PageHeader,
	PageTitle,
	PageSubtitle,
	PageHeaderButton,
} from "$components/page-header";
import ContactSection from "$components/contact-section";
import { NextSeo as SEO } from "next-seo";
import { PageComponent } from "$lib/types";
// const styles = require("./contact.module.scss");

const Contact: PageComponent<ContactProps> = () => {
	return (
		<React.Fragment>
			<SEO
				title="Let's Talk"
				description="You're one step away from reinventing your business on the web. What are you waiting for? Contact us today."
			/>
			<PageHeader clamped>
				<div>
					<PageTitle>Let’s Talk</PageTitle>
					<PageSubtitle>
						I can’t wait to hear what problems you’re looking to solve and
						discuss creative solutions to push your business forward. Fill out
						the form below and I’ll get back to you within the next business
						day.
					</PageSubtitle>
					<PageHeaderButton href="#contact">Get Started Now</PageHeaderButton>
				</div>
			</PageHeader>
			<ContactSection id="contact" />
		</React.Fragment>
	);
};

interface ContactProps {}

export default Contact;
