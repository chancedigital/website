import { StripePrice } from "$lib/types";
import { getStripe } from "$lib/get-stripe";

export async function getStripePrices(
	opts: {
		shouldThrow?: boolean;
	} = {}
): Promise<StripePrice[]> {
	const stripe = getStripe();
	const { shouldThrow } = opts;
	try {
		const prices = (await stripe.prices.list({expand: ['data.product']})).data.filter(
			(price) => price.active
		);
		return prices;
	} catch (error) {
		if (shouldThrow) {
			throw Error(error);
		}
		if (process.env.NODE_ENV === "development") {
			console.error(`Price fetching failed.`);
		}
		return [];
	}
}
