import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from 'contexts/user';

function Logout() {
  const { logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push('/');
  }, []);

  return <p>Logging out</p>;
}

export default Logout;
