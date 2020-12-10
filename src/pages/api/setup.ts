import type { NextApiRequest, NextApiResponse } from "next";
// import { getStripe } from "$lib/get-stripe";

// const stripe = getStripe();

function setup(req: NextApiRequest, res: NextApiResponse) {
	res.send({
		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
		basicPrice: process.env.STRIPE_BASIC_PRICE_ID,
	});
}

export default setup;
