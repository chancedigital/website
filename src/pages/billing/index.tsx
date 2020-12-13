import * as React from "react";
import {
	PageHeader,
	PageTitle,
	PageSubtitle,
	PageHeaderButton,
} from "$components/page-header";
import { InferGetStaticPropsType } from "next";
import { NextSeo as SEO } from "next-seo";
import { PageComponent } from "$lib/types";
import { config } from "$src/site-config";
import { loadStripe } from "@stripe/stripe-js";
import { getStripeKey } from "$lib/get-stripe-key";
import { getStripePrices } from "$lib/get-stripe-prices";
import { ThenArg } from "@reach/utils";
import { ProductSection } from "$components/product-section";

const Billing: PageComponent<BillingProps> = ({ stripeKey, prices }) => {
	const [error, setError] = React.useState<string | null>(null);
	const [Stripe, setStripe] = React.useState<ThenArg<
		ReturnType<typeof loadStripe>
	> | null>(null);
	const mounted = React.useRef(true);

	React.useEffect(() => {
		if (stripeKey) {
			loadStripe(stripeKey).then((Stripe) => setStripe(Stripe));
		}
	}, [stripeKey]);

	const handleResult = React.useCallback(function handleResult(result) {
		if (result.error) {
			setError(result.error.message);
		}
	}, []);

	const handleFetchResult = React.useCallback(
		// If a fetch error occurs, log it to the console and show it in the UI.
		function handleFetchResult(result: any) {
			if (!result.ok) {
				return result
					.json()
					.then((json: any) => {
						if (json.error && json.error.message) {
							throw new Error(
								result.url + " " + result.status + " " + json.error.message
							);
						}
					})
					.catch((err: string) => {
						if (mounted.current) {
							setError(err);
						}
						console.error(err);
					});
			}
			return result.json();
		},
		[]
	);

	// Create a Checkout Session with the selected plan ID
	const createCheckoutSession = React.useCallback(
		async function createCheckoutSession(priceId) {
			const result = await fetch(
				`${config.siteUrl}/api/create-checkout-session`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						priceId: priceId,
					}),
				}
			);
			return handleFetchResult(result);
		},
		[handleFetchResult]
	);

	React.useEffect(() => {
		mounted.current = false;
	}, []);

	return (
		<React.Fragment>
			<SEO title="Client Billing" />
			<PageHeader clamped>
				<div>
					<PageTitle>Sign Up for Maintenance</PageTitle>
					<PageSubtitle>
						Congratulations! Your new website or application is up and running.
						Let's keep it that way for the long haul.
					</PageSubtitle>

					<PageHeaderButton href="#products">Select a Package</PageHeaderButton>
				</div>
			</PageHeader>
			{error ? (
				<p>Something went wrong. Try again later!</p>
			) : (
				<ProductSection
					createCheckoutSession={createCheckoutSession}
					handlePurchaseResult={handleResult}
					prices={prices}
					stripe={Stripe}
				/>
			)}
		</React.Fragment>
	);
};

type BillingProps = InferGetStaticPropsType<typeof getStaticProps>;

export default Billing;

export async function getStaticProps() {
	const stripeKey = getStripeKey("STRIPE_PUBLISHABLE_KEY");
	const prices = await getStripePrices();
	return {
		props: {
			stripeKey,
			prices,
		},
	};
}
