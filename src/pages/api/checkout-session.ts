import type { NextApiRequest, NextApiResponse } from "next";
import { getStripe } from "$lib/get-stripe";

const stripe = getStripe();

async function checkoutSession(req: NextApiRequest, res: NextApiResponse) {
	const sessionId = Array.isArray(req.query.sessionId)
		? req.query.sessionId[0]
		: req.query.sessionId;
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	res.send(session);
}

export default checkoutSession;
