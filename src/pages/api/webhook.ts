import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { getStripe } from "$lib/get-stripe";

const stripe = getStripe();

async function webhook(req: NextApiRequest, res: NextApiResponse) {
	let event: ReturnType<typeof stripe.webhooks.constructEvent>;
	let eventType: typeof event["type"];
	let data: typeof event["data"];
	// Check if webhook signing is configured.
	if (process.env.STRIPE_WEBHOOK_SECRET) {
		// Retrieve the event by verifying the signature using the raw body and secret.

		let signature = req.headers["stripe-signature"];

		try {
			event = stripe.webhooks.constructEvent(
				await buffer(req),
				signature,
				process.env.STRIPE_WEBHOOK_SECRET
			);
		} catch (err) {
			console.log(`⚠️  Webhook signature verification failed.`);
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

	console.log({ data });

	if (eventType === "checkout.session.completed") {
		console.log(`🔔  Payment received!`);
	}

	res.status(200).json({ received: true });
}

export default webhook;
