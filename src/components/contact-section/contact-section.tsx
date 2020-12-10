import * as React from "react";
import cx from "clsx";
import { useRouter } from "next/router";
import * as Yup from "yup";
import fetch from "unfetch";
import { Form, FormInput, FormTextarea } from "$components/form";
const styles = require("./contact-section.module.scss");

const FORM_SCHEMA = Yup.object().shape({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last Name is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	comments: Yup.string()
		.min(10, "Message is too short. Try to give us some more context!")
		.max(
			2500,
			"Message is too long. Try giving us an overview; we will reach out for more context if needed!"
		)
		.required("Message is required"),
});

export interface ContactSectionProps
	extends React.ComponentPropsWithoutRef<"section"> {}

function encode(data: any) {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
		.join("&");
}

const ContactSection: React.FC<ContactSectionProps> = ({
	children,
	className,
	...props
}) => {
	const router = useRouter();
	const handleSubmit = (data: any) => {
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({
				"form-name": "contact",
				...data,
			}),
		})
			.then(() => {
				router.push("/thanks");
			})
			.catch(console.error); // TODO: Set errors
	};

	return (
		<section
			aria-label="Contact form"
			className={cx(styles.section, className)}
			{...props}
		>
			<div className={styles.container}>
				<Form
					buttonText="Submit"
					initialValues={{
						firstName: "",
						lastName: "",
						email: "",
						comments: "",
					}}
					onSubmit={handleSubmit}
					schema={FORM_SCHEMA}
					name="contact"
					method="post"
					data-netlify="true"
					data-netlify-honeypot="bot-field"
					render={(innerProps: any) => {
						return (
							<React.Fragment>
								<FormInput
									type="text"
									name="firstName"
									label="First Name"
									required
									showLabel
								/>

								<FormInput
									type="text"
									name="lastName"
									label="Last Name"
									required
									showLabel
									errors={innerProps.errors.lastName}
									touched={innerProps.touched.lastName}
								/>
								<FormInput
									type="email"
									name="email"
									label="Your Email"
									required
									showLabel
									errors={innerProps.errors.email}
									touched={innerProps.touched.email}
								/>
								<FormTextarea
									component="textarea"
									name="comments"
									label="How can I help you?"
									required
									showLabel
									errors={innerProps.errors.comments}
									touched={innerProps.touched.comments}
									spellCheck={true}
									rows={10}
								/>
							</React.Fragment>
						);
					}}
				/>
			</div>
		</section>
	);
};

export default ContactSection;
