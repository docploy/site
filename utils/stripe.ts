import { Stripe, loadStripe } from '@stripe/stripe-js';

import { createCheckoutSession } from 'utils/firebase';

let stripePromise: Stripe | null;
const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '');
  }
  return stripePromise;
};

export const redirectToCheckout = async (uid: string, priceId: string) => {
  const onSnapshotFn = async (sessionId: string) => {
    if (sessionId) {
      const stripe = await initializeStripe();
      stripe?.redirectToCheckout({ sessionId });
    }
  };

  await createCheckoutSession(uid, priceId, onSnapshotFn);
};

export default initializeStripe;
