import Stripe from "stripe";
import { getStripeKey } from "./get-stripe-key";

let stripe: any;

export function getStripe(): Stripe {
	if (stripe === undefined) {
		stripe = new Stripe(getStripeKey("STRIPE_SECRET_KEY"), {
			// https://github.com/stripe/stripe-node#configuration
			apiVersion: "2020-08-27",
			maxNetworkRetries: 3,
		});
	}
	return stripe;
}
