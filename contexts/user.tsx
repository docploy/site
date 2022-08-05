import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, isProUser, login } from 'utils/firebase';

import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

type Props = {
  children: React.ReactNode;
};

interface Context {
  user: any;
  isLoading: boolean;
  logout: () => void;
  login: () => void;
  isPro: boolean;
}

const Context = createContext<Context>({
  user: null,
  isLoading: true,
  logout: () => null,
  login: () => null,
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

  // Wrapping the login as an async function to make the interface consistent with logout
  const awaitedLogin = async () => {
    return await login();
  };

  const exposed = {
    user,
    isLoading,
    logout,
    login: awaitedLogin,
    isPro,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
