import React, { createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

type Alert = {
  color: string;
  message: string;
};

const ALERTS: { [key: string]: Alert } = {
  paymentSuccess: {
    color: 'green',
    message: 'You have successfully added a payment plan',
  },
  paymentCancelled: {
    color: 'green',
    message: 'You have successfully removed a payment plan',
  },
};

interface Context {
  color?: 'green' | null;
  message?: string;
}

const Context = createContext<Context>({
  color: null,
  message: '',
});

const Provider = ({ children }: Props) => {
  const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const alert = router.query?.alert as string;
    if (alert && alert in ALERTS) {
      setData(ALERTS[alert]);
    }
  }, [router.query]);

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useAlert = () => useContext(Context);

export default Provider;
