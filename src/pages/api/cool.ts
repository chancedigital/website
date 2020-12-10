import type { NextApiRequest, NextApiResponse } from "next";

function cool(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json({ received: true });
}

export default cool;
