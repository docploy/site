import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
import { buffer } from 'micro';
import { getServiceSupabase } from 'utils/supabase';

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
  });
  const signature = req.headers['stripe-signature'] || '';
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      process.env.STRIPE_SIGNING_SECRET || ''
    );
  } catch (error: any) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  const supabase = getServiceSupabase();

  switch (event.type) {
    case 'customer.subscription.updated':
      await supabase
        .from('profile')
        .update({ is_subscribed: true })
        .eq('stripe_customer', (<any>event.data.object).customer);
      break;
    case 'customer.subscription.deleted':
      await supabase
        .from('profile')
        .update({ is_subscribed: false })
        .eq('stripe_customer', (<any>event.data.object).customer);
      break;
  }

  res.send({ received: true });
};

export default handler;
