import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
import cookie from 'cookie';
import { supabase } from 'utils/supabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return res.status(401).send('Unauthorized');
  }

  const token = cookie.parse(req.headers.cookie || '')['sb-access-token'];
  supabase.auth.session = (): any => ({
    access_token: token,
  });

  const {
    data: { stripe_customer },
  } = await supabase
    .from('profile')
    .select('stripe_customer')
    .eq('id', user.id)
    .single();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
  });

  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_customer,
    return_url: process.env.NEXT_PUBLIC_BASE_URL,
  });

  res.send({
    url: session.url,
  });
};

export default handler;
