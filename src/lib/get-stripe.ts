import Stripe from "stripe";
import { getStripeKey } from "./get-stripe-key";

export function getStripe(): Stripe {
	return new Stripe(getStripeKey("STRIPE_SECRET_KEY"), {
		// https://github.com/stripe/stripe-node#configuration
		apiVersion: "2020-08-27",
		maxNetworkRetries: 3,
	});
}
