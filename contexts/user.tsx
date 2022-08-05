import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, isProUser } from 'utils/firebase';

import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

type Props = {
  children: React.ReactNode;
};

interface Context {
  user: any;
  isLoading: boolean;
  logout: () => void;
  isPro: boolean;
}

const Context = createContext<Context>({
  user: null,
  isLoading: true,
  logout: () => null,
  isPro: false,
});

const Provider = ({ children }: Props) => {
  const [user, isLoading, error] = useAuthState(auth);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    (async () => {
      if (user) {
        setIsPro(await isProUser(user));
      }
    })();
  }, [user]);

  const logout = async () => {
    return await signOut(auth);
  };

  const exposed = {
    user,
    isLoading,
    logout,
    isPro,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
