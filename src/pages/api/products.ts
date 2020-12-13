import type { NextApiRequest, NextApiResponse } from "next";
import { getStripeProducts } from "$lib/get-stripe-products";

async function products(req: NextApiRequest, res: NextApiResponse) {
	try {
		const products = await getStripeProducts({ shouldThrow: true });
		res.send(products);
	} catch (error) {
		console.error(`⚠️  Product fetching failed.`);
		res.status(400).send(`Error fetching products: ${error.message}`);
	}
}

export default products;
