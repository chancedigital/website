import * as React from "react";
import {
	BasicSection,
	BasicSectionInner,
	BasicSectionHeading,
} from "$components/basic-section";
import { StripeProduct, StripePrice, ThenArg } from "$lib/types";
import { loadStripe } from "@stripe/stripe-js";
import { TextCard } from "$components/text-card";
import { Button } from "$components/button";
const styles = require("./product-section.module.scss");

export interface ProductSectionProps
	extends React.ComponentPropsWithoutRef<"section"> {
	error?: React.ReactNode;
	prices: StripePrice[];
	createCheckoutSession: (id: string) => Promise<any>;
	handlePurchaseResult: (result: any) => any;
	stripe: ThenArg<ReturnType<typeof loadStripe>>;
}

const ProductSection: React.FC<ProductSectionProps> = ({
	children,
	error,
	prices,
	createCheckoutSession,
	handlePurchaseResult,
	stripe,
	...props
}) => {
	const StripeRef = React.useRef(undefined);
	if (StripeRef.current === undefined && stripe != null) {
		StripeRef.current = stripe;
	}

	return (
		<BasicSection {...props}>
			<BasicSectionInner>
				<BasicSectionHeading>Maintenance Products</BasicSectionHeading>
				{error ? <div>{error}</div> : null}
				{prices.length > 0 ? (
					<ul className={styles.list}>
						{prices.map((price) => {
							const product = price.product as StripeProduct;
							const priceInDollars = new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(price.unit_amount / 100);
							const isRecurring = price.type === "recurring";
							return (
								<li className={styles.item} key={product.id}>
									<TextCard
										heading={product.name}
										content={product.description}
									>
										<br />
										<Button
											id="basic-plan-btn"
											onClick={() => {
												createCheckoutSession(price.id).then((data) => {
													// Call Stripe.js method to redirect to the new Checkout page
													StripeRef.current
														?.redirectToCheckout({
															sessionId: (data as any).sessionId,
														})
														.then(handlePurchaseResult);
												});
											}}
										>
											{priceInDollars.concat(
												isRecurring ? ` per ${price.recurring.interval}` : ""
											)}
										</Button>
									</TextCard>
								</li>
							);
						})}
					</ul>
				) : (
					<p>No products saddddd</p>
				)}
			</BasicSectionInner>
		</BasicSection>
	);
};

export { ProductSection };
