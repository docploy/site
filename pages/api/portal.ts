import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { session_id },
  } = req;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
  });

  const checkoutSession = await stripe?.checkout.sessions.retrieve(session_id);
  const customer = checkoutSession.customer as string;

  const portalSession = await stripe?.billingPortal.sessions.create({
    customer,
    return_url: process.env.NEXT_PUBLIC_BASE_URL,
  });

  res.send({
    url: portalSession.url,
  });
};

export default handler;
