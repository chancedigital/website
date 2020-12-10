import * as React from "react";
import clsx from "clsx";

export { assignRef } from "@reach/utils";
export * from "./add-scroll-event-listener";
export * from "./can-use-dom";
export * from "./ease";
export * from "./emitter";
export * from "./get-breakpoint-query-object";
export * from "./get-scroll-position";
export * from "./in-viewport";
export * from "./is-valid-url";
export * from "./use-animation-end-listener";
export * from "./use-breakpoint";
export * from "./use-interval";
export * from "./use-measure";

export function unSlashIt(str: string) {
	return str.replace(/^(\/*)|(\/*)$/g, "");
}

export function leadingSlashIt(str: string) {
	return "/" + unSlashIt(str);
}

export function trailingSlashIt(str: string) {
	return unSlashIt(str) + "/";
}

export function doubleSlashIt(str: string) {
	return "/" + unSlashIt(str) + "/";
}

export function ucFirst(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function forwardRef<ComponentType extends As, Props = {}>(
	render: ForwardRefWithAsRenderFunction<ComponentType, Props>
): ForwardRefExoticComponentWithAs<
	ComponentType,
	Props
> /* & { displayName: string; } */ {
	const Comp: any = React.forwardRef(render);
	if (render.name) {
		Comp.displayName = render.name;
	}
	return Comp;
}

export { clsx as cx };

export type AssignableRef<ValueType> =
	| {
			bivarianceHack(instance: ValueType | null): void;
	  }["bivarianceHack"]
	| React.MutableRefObject<ValueType | null>;

export type As<BaseProps = any> = React.ElementType<BaseProps>;

export type PropsWithAs<
	ComponentType extends As,
	ComponentProps
> = ComponentProps &
	Omit<
		React.ComponentPropsWithRef<ComponentType>,
		"as" | keyof ComponentProps
	> & {
		as?: ComponentType;
	};

export type PropsFromAs<
	ComponentType extends As,
	ComponentProps
> = (PropsWithAs<ComponentType, ComponentProps> & { as: ComponentType }) &
	PropsWithAs<ComponentType, ComponentProps>;

export interface FunctionComponentWithAs<
	ComponentType extends As,
	ComponentProps
> {
	/**
	 * Inherited from React.FunctionComponent with modifications to support `as`
	 */
	<TT extends As>(
		props: PropsWithAs<TT, ComponentProps>,
		context?: any
	): React.ReactElement<any, any> | null;
	(
		props: PropsWithAs<ComponentType, ComponentProps>,
		context?: any
	): React.ReactElement<any, any> | null;

	/**
	 * Inherited from React.FunctionComponent
	 */
	displayName?: string;
	propTypes?: React.WeakValidationMap<
		PropsWithAs<ComponentType, ComponentProps>
	>;
	contextTypes?: React.ValidationMap<any>;
	defaultProps?: Partial<PropsWithAs<ComponentType, ComponentProps>>;
}

export interface ExoticComponentWithAs<
	ComponentType extends As,
	ComponentProps
> {
	/**
	 * **NOTE**: Exotic components are not callable.
	 * Inherited from React.ExoticComponent with modifications to support `as`
	 */
	<TT extends As>(
		props: PropsWithAs<TT, ComponentProps>
	): React.ReactElement | null;
	(
		props: PropsWithAs<ComponentType, ComponentProps>
	): React.ReactElement | null;

	/**
	 * Inherited from React.ExoticComponent
	 */
	readonly $$typeof: symbol;
}

interface NamedExoticComponentWithAs<ComponentType extends As, ComponentProps>
	extends ExoticComponentWithAs<ComponentType, ComponentProps> {
	/**
	 * Inherited from React.NamedExoticComponent
	 */
	displayName?: string;
}

export interface ForwardRefExoticComponentWithAs<
	ComponentType extends As,
	ComponentProps
> extends NamedExoticComponentWithAs<ComponentType, ComponentProps> {
	/**
	 * Inherited from React.ForwardRefExoticComponent
	 * Will show `ForwardRef(${Component.displayName || Component.name})` in devtools by default,
	 * but can be given its own specific name
	 */
	defaultProps?: Partial<PropsWithAs<ComponentType, ComponentProps>>;
	propTypes?: React.WeakValidationMap<
		PropsWithAs<ComponentType, ComponentProps>
	>;
}

export interface MemoExoticComponentWithAs<
	ComponentType extends As,
	ComponentProps
> extends NamedExoticComponentWithAs<ComponentType, ComponentProps> {
	readonly type: ComponentType extends React.ComponentType
		? ComponentType
		: FunctionComponentWithAs<ComponentType, ComponentProps>;
}

export interface ForwardRefWithAsRenderFunction<
	ComponentType extends As,
	ComponentProps = {}
> {
	(
		props: React.PropsWithChildren<PropsFromAs<ComponentType, ComponentProps>>,
		ref:
			| ((
					instance:
						| (ComponentType extends keyof ElementTagNameMap
								? ElementTagNameMap[ComponentType]
								: any)
						| null
			  ) => void)
			| React.MutableRefObject<
					| (ComponentType extends keyof ElementTagNameMap
							? ElementTagNameMap[ComponentType]
							: any)
					| null
			  >
			| null
	): React.ReactElement | null;
	displayName?: string;
	// explicit rejected with `never` required due to
	// https://github.com/microsoft/TypeScript/issues/36826
	/**
	 * defaultProps are not supported on render functions
	 */
	defaultProps?: never;
	/**
	 * propTypes are not supported on render functions
	 */
	propTypes?: never;
}

/**
 * This type is included in the DOM lib but is deprecated. It's still quite useful, so we want to
 * include it here and reference it when possible to avoid any issues when updating TS.
 */
export type ElementTagNameMap = HTMLElementTagNameMap &
	Pick<
		SVGElementTagNameMap,
		Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>
	>;
