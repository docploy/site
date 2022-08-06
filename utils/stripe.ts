import { Stripe, loadStripe } from '@stripe/stripe-js';

import type { MergedUser } from 'contexts/user';
import { createCheckoutSession } from 'utils/firebase';

let stripePromise: Stripe | null;
const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '');
  }
  return stripePromise;
};

export const redirectToCheckout = async (user: MergedUser, priceId: string) => {
  console.log('inside redirectToCheckout');
  const onSnapshotFn = async (sessionId: string) => {
    if (sessionId) {
      const stripe = await initializeStripe();

      stripe?.redirectToCheckout({
        sessionId,
      });
    }
  };

  await createCheckoutSession(user.uid, priceId, onSnapshotFn);
};

export default initializeStripe;
