import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { customer },
  } = req;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
  });

  const portalSession = await stripe?.billingPortal.sessions.create({
    customer,
    return_url: process.env.NEXT_PUBLIC_BASE_URL,
  });

  res.send({
    url: portalSession.url,
  });
};

export default handler;
