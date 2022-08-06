import Head from 'next/head';
import Plan, { type PlanData } from 'components/Plan';
import { useRouter } from 'next/router';
import { useUser } from 'contexts/user';
import { GITHUB_ACTION_URL } from 'constants/url';

function Pricing() {
  const { user } = useUser();
  const router = useRouter();

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
      name: 'Pro',
      price: '49',
      description: 'For small teams (up to 10 users)',
      features: ['Deploys to your custom domain', 'Email support'],
      cta: 'Sign up',
      onClick: () => {
        const planUrl = '/pricing/pro';
        if (user) {
          router.push(planUrl);
        } else {
          router.push(`/login?redirect=${encodeURIComponent(planUrl)}`);
        }
      },
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
    </div>
  );
}

export default Pricing;
