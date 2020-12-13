const STRIPE_KEY_PREFIXES = [
	"STRIPE_PUBLISHABLE_KEY",
	"STRIPE_SECRET_KEY",
	"STRIPE_WEBHOOK_SECRET",
	"STRIPE_BASIC_PRICE_ID",
	"STRIPE_BASIC_HOSTING_ID",
] as const;

export function getStripeKey(prefix: StripeKeyPrefix): string {
	const name = `${prefix}${process.env.STRIPE_KEY_POSTFIX ?? ""}`;
	const key = process.env[name];
	if (key === undefined) {
		throw new Error(`Missing ${name} environment variable`);
	}
	return key;
}

export type StripeKeyPrefix = typeof STRIPE_KEY_PREFIXES[number];
