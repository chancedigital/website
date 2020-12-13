import type { NextApiRequest, NextApiResponse } from "next";
import { getStripePrices } from "$lib/get-stripe-prices";

async function prices(req: NextApiRequest, res: NextApiResponse) {
	try {
		const prices = await getStripePrices({ shouldThrow: true });
		res.send(prices);
	} catch (error) {
		console.error(`⚠️ Price fetching failed.`);
		res.status(400).send(`Error fetching prices: ${error.message}`);
	}
}

export default prices;
