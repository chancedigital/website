import { StripeProduct } from "$lib/types";
import { getStripe } from "$lib/get-stripe";

export async function getStripeProducts(
	opts: {
		shouldThrow?: boolean;
	} = {}
): Promise<StripeProduct[]> {
	const stripe = getStripe();
	const { shouldThrow } = opts;
	try {
		const products = (
			await stripe.products.list({
				limit: 3,
			})
		).data.filter((product) => product.active);
		return products;
	} catch (error) {
		if (shouldThrow) {
			throw Error(error);
		}
		if (process.env.NODE_ENV === "development") {
			console.error(`Product fetching failed.`);
		}
		return [];
	}
}
