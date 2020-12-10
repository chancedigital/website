import React from "react";
import cx from "clsx";
import { useId } from "@reach/auto-id";
import { VisuallyHidden } from "@reach/visually-hidden";
import { useField } from "formik";
const styles = require("./field.module.scss");

interface FieldProps extends React.ComponentProps<"input"> {
	component?: "input" | "select" | "textarea";
	showLabel?: boolean;
	label: string;
}

const Field = React.forwardRef<any, FieldProps>(
	(
		{
			className,
			component = "input",
			children,
			label,
			showLabel = false,
			placeholder,
			spellCheck,
			required,
			type,
			...rest
		},
		ref
	) => {
		const errorId = `error-${useId()}`;
		const Element: any = component;
		const [field, meta] = useField(rest.name);
		const showErrors = meta.error && meta.touched;
		return (
			<label className={cx(className, styles.base)}>
				<span
					className={cx({
						[styles.label]: showLabel,
						"util-visually-hidden": !showLabel,
					})}
				>
					{label}
					{required ? (
						<span className="util-required">
							<span aria-hidden> *</span>
							<VisuallyHidden>(required field)</VisuallyHidden>
						</span>
					) : null}
				</span>
				<Element
					aria-invalid={showErrors}
					aria-describedby={showErrors ? errorId : undefined}
					className={cx(styles.field, {
						[styles[`field--${component}`]]: component,
						[styles[`field--${type}`]]: type,
						[styles["field--error"]]: showErrors,
					})}
					placeholder={
						!showLabel ? (required ? `${label} *` : label) : placeholder
					}
					type={type}
					spellCheck={spellCheck || false}
					ref={ref as any}
					{...field}
					{...rest}
				>
					{children}
				</Element>
				{showErrors && (
					<div id={errorId} className={styles.errors}>
						{meta.error}
					</div>
				)}
			</label>
		);
	}
);

export default Field;
