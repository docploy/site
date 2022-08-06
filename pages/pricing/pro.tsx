import { useEffect, useState } from 'react';

import { redirectToCheckout } from 'utils/stripe';
import { useUser } from 'contexts/user';

function Pro() {
  const { user } = useUser();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isRedirecting && user) {
      setIsRedirecting(true);
      redirectToCheckout(
        user,
        process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_ID || ''
      );
    }
  }, [user, isRedirecting]);

  return (
    <div className="flex justify-center p-32">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
    </div>
  );
}

export default Pro;
