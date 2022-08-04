import { useEffect } from 'react';
import { useUser } from 'contexts/user';

function Logout() {
  const { logout } = useUser();

  useEffect(() => {
    logout();
  }, []);

  return <p>Logging out</p>;
}

export default Logout;
