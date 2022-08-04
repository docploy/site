import Head from 'next/head';
import Plan, { type PlanData } from 'components/Plan';
import Stripe from 'stripe';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useUser } from 'contexts/user';
import { GITHUB_ACTION_URL } from 'constants/url';

type Props = {
  plans: any;
  prices: any;
};

const PRO_PLAN_ID = 'price_1LSYtoHP8HUEeOoaG0tfbZ4K';

export const getStaticProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
  });

  const { data: prices } = await stripe.prices.list();

  const plans = await Promise.all(
    prices.map(async (price: Stripe.Price) => {
      const productId = price.product as string;
      const product = await stripe.products.retrieve(productId);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price?.recurring?.interval,
        currency: price.currency,
      };
    })
  );

  return {
    props: {
      plans,
      prices,
    },
  };
};

function Pricing({ plans, prices }: Props) {
  // TODO: make sure that a user signs up before they can subscribe
  const { user, isLoading } = useUser();
  const router = useRouter();

  async function processSubscription(planId: string) {
    const { data } = await axios.get(`/api/subscription/${planId}`);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '');
    await stripe?.redirectToCheckout({ sessionId: data.id });
  }

  const PLANS: PlanData[] = [
    {
      name: 'Free',
      price: '0',
      description: 'For personal and open source projects',
      features: ['Deploys to docploy.com/project', 'Integrates with GitHub'],
      cta: 'Start now',
      onClick: () => {
        router.push(GITHUB_ACTION_URL);
      },
    },
    {
      name: 'Pro (coming soon)',
      price: '49',
      description: 'For small teams (up to 10 users)',
      features: ['Deploys to your custom domain', 'Email support'],
      cta: 'Sign up',
      onClick: () => {
        processSubscription(PRO_PLAN_ID);
        return;
      },
      isDisabled: true,
    },
    {
      name: 'Enterprise',
      description: 'For large businesses with many users',
      features: ['Deploys preview builds for each branch', 'Live Support'],
      cta: 'Contact us',
      onClick: () => {
        router.push('/contact');
      },
    },
  ];

  // Make sure we don't show prices until the user data has loaded
  // Otherwise, the user will see a flash of contenet
  return (
    !isLoading && (
      <div>
        <Head>
          <title>Docploy Pricing</title>
        </Head>

        <h1 className="font-bold mb-4 text-5xl text-center">Find a plan</h1>
        <h2 className="m-auto max-w-2xl mb-12 text-2xl text-center text-slate-500">
          Select a plan that meets your requirements
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {PLANS.map((plan, i) => {
            return <Plan key={i} {...plan} />;
          })}
        </div>
        <button onClick={() => processSubscription(plans[0].id)}>
          Subscribe
        </button>
      </div>
    )
  );
}

export default Pricing;
