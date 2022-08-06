import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signOut } from 'firebase/auth';
import { auth, getUserData, isProUser, login } from 'utils/firebase';

type Props = {
  children: React.ReactNode;
};

interface Context {
  user: any;
  logout: () => void;
  login: () => void;
}

const Context = createContext<Context>({
  user: null,
  logout: () => null,
  login: () => null,
});

export type MergedUser = User & {
  isPro?: boolean;
  stripeId?: string;
};

const Provider = ({ children }: Props) => {
  const [user, setUser] = useState<MergedUser | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        let mergedUser: MergedUser = Object.assign({}, user);
        const isPro = await isProUser(user);
        mergedUser.isPro = isPro;
        if (isPro) {
          mergedUser.isPro = isPro;
        }
        const userData = await getUserData(user);

        if (userData?.stripeId) {
          mergedUser.stripeId = userData.stripeId;
        }

        setUser(mergedUser);
      }
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Wrapping the login as an async function to make the interface consistent with logout
  const awaitedLogin = async () => {
    return await login();
  };

  const exposed = {
    user,
    logout,
    login: awaitedLogin,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
