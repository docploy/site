import React, { createContext, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { supabase } from 'utils/supabase';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

interface Context {
  user: any;
  login: any;
  logout: any;
  isLoading: boolean;
}

const Context = createContext<Context>({
  user: null,
  login: null,
  logout: null,
  isLoading: true,
});

const Provider = ({ children }: Props) => {
  const [user, setUser] = useState(supabase.auth.user());
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {
        const { data: profile } = await supabase
          .from('profile')
          .select('*')
          .eq('id', sessionUser.id)
          .single();

        setUser({
          ...sessionUser,
          ...profile,
        });

        setIsLoading(false);
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  useEffect(() => {
    axios.post('/api/set-cookie', {
      event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
      session: supabase.auth.session(),
    });
  }, [user]);

  const login = async () => {
    await supabase.auth.signIn(
      {
        provider: 'github',
      },
      {
        redirectTo: process.env.NEXT_PUBLIC_BASE_URL,
      }
    );
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const exposed = {
    user,
    login,
    logout,
    isLoading,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
