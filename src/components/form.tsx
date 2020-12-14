import React, { useState, useRef } from "react";
import { Formik } from "formik";
import cx from "clsx";
import { Button } from "$components/button";
import Field from "$components/field";
import { useAnimationEndListener } from "$lib/use-animation-end-listener";
const styles = require("./form.module.scss");

interface FormProps extends React.ComponentPropsWithRef<"form"> {
	buttonText?: string;
	buttonClassName?: string;
	initialValues?: Record<string, any>;
	onSubmit?(values: any): void;
	onSubmitButtonClick?(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void;
	render(props: any): any;
	renderButton?(props: any): any;
	schema: any;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
	{
		buttonText = "Submit",
		buttonClassName,
		className,
		initialValues = {},
		onSubmit = () => {},
		onSubmitButtonClick,
		render,
		renderButton,
		schema,
		ref: _ref,
		...rest
	},
	ref
) {
	const submitButton = useRef<HTMLButtonElement>(null);
	const [errors, setErrors] = useState(false);
	useAnimationEndListener(submitButton, () => void setErrors(false));

	return (
		<Formik
			validationSchema={schema}
			initialValues={initialValues}
			onSubmit={onSubmit}
		>
			{(formik) => (
				<form
					className={cx(styles.form, className)}
					onReset={formik.handleReset}
					onSubmit={formik.handleSubmit}
					ref={ref}
					{...rest}
				>
					{render(formik)}
					{renderButton ? (
						renderButton({
							errors,
							className: styles.button,
						})
					) : (
						<Button
							ref={submitButton}
							htmlType="submit"
							className={cx(styles.button, buttonClassName)}
							wobble={errors}
							onClick={(e) => {
								if (!formik.isValid !== errors) {
									setErrors(!formik.isValid);
								}
								onSubmitButtonClick && onSubmitButtonClick(e);
							}}
						>
							{buttonText}
						</Button>
					)}
				</form>
			)}
		</Formik>
	);
});
Form.displayName = "Form";

const FormInput = React.forwardRef<HTMLInputElement, any>(function FormInput(
	{ className, ...props },
	ref
) {
	return <Field className={cx(className, styles.input)} ref={ref} {...props} />;
});
FormInput.displayName = "FormInput";

const FormTextarea = React.forwardRef<HTMLTextAreaElement, any>(
	function FormTextarea({ className, ...props }, ref) {
		return (
			<Field
				className={cx(className, styles.textarea)}
				ref={ref}
				{...props}
				component="textarea"
			/>
		);
	}
);
FormTextarea.displayName = "FormTextarea";

const FormSelect = React.forwardRef<HTMLSelectElement, any>(function FormSelect(
	{ className, ...props },
	ref
) {
	return (
		<Field
			className={cx(className, styles.select)}
			ref={ref}
			{...props}
			component="select"
		/>
	);
});
FormSelect.displayName = "FormSelect";

export { Form, FormInput, FormTextarea, FormSelect };
export default Form;
