import { GITHUB_ACTION_URL } from 'constants/url';
import Link from 'next/link';
import axios from 'axios';
import router from 'next/router';
import { useUser } from 'contexts/user';

function Navbar() {
  const { user, isLoading } = useUser();

  async function loadPortal() {
    const { data } = await axios.get('/api/portal');
    router.push(data.url);
  }

  return (
    <nav className="align-baseline flex justify-between">
      <Link href="/">
        <span className="cursor-pointer font-bold text-2xl">Docploy</span>
      </Link>
      <div className="flex gap-8 items-center">
        <Link href="/pricing">
          <a className="font-bold">Pricing</a>
        </Link>
        <Link href="/blog">
          <a className="font-bold">Blog</a>
        </Link>
        <Link href="/contact">
          <a className="font-bold">Contact</a>
        </Link>
        {!user ? (
          <Link href="/login">
            <a className="font-bold">Login</a>
          </Link>
        ) : (
          <Link href="/logout">
            <a className="font-bold">Logout</a>
          </Link>
        )}
        {user?.is_subscribed && (
          <a onClick={loadPortal} className="cursor-pointer font-bold">
            Manage Plan
          </a>
        )}
        <a href={GITHUB_ACTION_URL}>
          <button className="bg-amber-400 font-bold hover:bg-amber-300 py-2 px-4 rounded text-gray-900">
            Install on GitHub
          </button>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
