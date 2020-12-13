import type { NextApiRequest, NextApiResponse } from "next";
import { getStripe } from "$lib/get-stripe";
import { config } from "$src/site-config";

const stripe = getStripe();

async function customerPortal(req: NextApiRequest, res: NextApiResponse) {
	// For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
	// Typically this is stored alongside the authenticated user in your database.
	const { sessionId } = req.body;
	const checkoutsession = await stripe.checkout.sessions.retrieve(sessionId);

	// This is the url to which the customer will be redirected when they are done
	// managign their billing with the portal.
	const returnUrl = config.siteUrl;

	const portalsession = await stripe.billingPortal.sessions.create({
		customer: checkoutsession.customer as string,
		return_url: returnUrl,
	});

	res.send({
		url: portalsession.url,
	});
}

export default customerPortal;
