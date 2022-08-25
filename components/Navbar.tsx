import { GITHUB_ACTION_URL } from 'constants/url';
import Link from 'next/link';
import axios from 'axios';
import router from 'next/router';
import { useUser } from 'contexts/user';

function Navbar() {
  const { user } = useUser();

  // TODO(on: date("2022-08-26"), to: cvuong) Validate that loading the portal works
  async function loadPortal() {
    const {
      data: { url },
    } = await axios.post('/api/portal', {
      customer: user?.stripeId,
    });
    router.push(url);
  }

  return (
    <nav className="align-baseline flex justify-between">
      <Link href="/">
        <span className="cursor-pointer font-bold text-2xl">Docploy</span>
      </Link>
      <div className="flex gap-8 items-center">
        <Link href="https://docploy.github.io/site/">
          <a className="font-bold">Docs</a>
        </Link>
        <Link href="/pricing">
          <a className="font-bold">Pricing</a>
        </Link>
        <Link href="/blog">
          <a className="font-bold">Blog</a>
        </Link>
        <Link href="/contact">
          <a className="font-bold">Contact</a>
        </Link>
        {/* TODO: Render the user using SSR to avoid flash of content */}
        {!user ? (
          <Link href="/login">
            <a className="font-bold">Login</a>
          </Link>
        ) : (
          <Link href="/logout">
            <a className="font-bold">Logout</a>
          </Link>
        )}
        {user?.isPro && (
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
