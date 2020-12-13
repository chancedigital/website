import type { NextApiRequest, NextApiResponse } from "next";
import { getStripe } from "$lib/get-stripe";
import { config } from '$src/site-config';

const stripe = getStripe();

async function createCheckoutSession(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const domainURL = config.siteUrl
	const { priceId } = req.body;

	// Create new Checkout Session for the order
	// Other optional params include:
	// [billing_address_collection] - to display billing address details on the page
	// [customer] - if you have an existing Stripe Customer ID
	// [customer_email] - lets you prefill the email input in the form
	// For full details see https://stripe.com/docs/api/checkout/sessions/create
	try {
		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			// ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
			success_url: `${domainURL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${domainURL}/billing`,
		});

		res.send({ sessionId: session.id });
	} catch (e) {
		res.status(400);
		return res.send({
			error: {
				message: e.message,
			},
		});
	}
}

export default createCheckoutSession;
