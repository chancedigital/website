import type { NextApiRequest, NextApiResponse } from "next";
import { getStripeKey } from "$lib/get-stripe-key";

function setup(req: NextApiRequest, res: NextApiResponse) {
	try {
		res.send({
			publishableKey: getStripeKey("STRIPE_PUBLISHABLE_KEY"),
		});
	} catch (error) {
		console.error(`⚠️ Publishable key not found.`);
		res.status(400).send({
			publishableKey: null,
			error,
		});
	}
}

export default setup;
