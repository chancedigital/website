import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { getStripe } from "$lib/get-stripe";
import { getStripeKey } from "$lib/get-stripe-key";

const stripe = getStripe();

async function webhook(req: NextApiRequest, res: NextApiResponse) {
	let event: ReturnType<typeof stripe.webhooks.constructEvent>;
	let eventType: typeof event["type"];
	let data: typeof event["data"];
	let webhookKey = getStripeKey("STRIPE_WEBHOOK_SECRET");
	// Check if webhook signing is configured.
	if (webhookKey) {
		// Retrieve the event by verifying the signature using the raw body and secret.

		let signature = req.headers["stripe-signature"];

		try {
			event = stripe.webhooks.constructEvent(
				await buffer(req),
				signature,
				webhookKey
			);
		} catch (err) {
			console.error(`⚠️ Webhook signature verification failed.`);
			res.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}
		// Extract the object from the event.
		data = event.data;
		eventType = event.type;
	} else {
		// Webhook signing is recommended, but if the secret is not configured in `config.js`,
		// retrieve the event data directly from the request body.
		data = req.body.data;
		eventType = req.body.type;
	}

	if (eventType === "checkout.session.completed") {
		console.log(`🔔  Payment received!`);
	}

	res.status(200).json({ received: true });
}

export default webhook;
