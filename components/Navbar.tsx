import { GITHUB_ACTION_URL } from 'constants/url';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="align-baseline flex justify-between">
      <Link href="/">
        <span className="cursor-pointer font-bold text-2xl">Docploy</span>
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/blog">
          <a className="font-bold">Blog</a>
        </Link>
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
