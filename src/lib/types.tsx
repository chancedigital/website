import { getStripe } from "$lib/get-stripe";
export interface PageComponent<P> extends React.FC<P> {
	getLayout?(page: React.ReactElement, pageProps: P): React.ReactElement;
}

export interface ScrollPosition {
	x: number;
	y: number;
}

export interface DOMRectReadOnly {
	readonly x: number;
	readonly y: number;
	readonly width: number;
	readonly height: number;
	readonly top: number;
	readonly right: number;
	readonly bottom: number;
	readonly left: number;
}

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Stripe = ReturnType<typeof getStripe>;

export type StripePrice = ThenArg<
	ReturnType<Stripe["prices"]["list"]>
>["data"][number];

export type StripeProduct = ThenArg<
	ReturnType<Stripe["products"]["list"]>
>["data"][number];
