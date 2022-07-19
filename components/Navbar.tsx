import { GITHUB_ACTION_URL } from 'constants/url';

function Navbar() {
  return (
    <nav className="align-baseline flex justify-between">
      <span className="font-bold text-2xl">Docploy</span>
      <a href={GITHUB_ACTION_URL}>
        <button className="bg-amber-400 font-bold hover:bg-amber-300 py-2 px-4 rounded text-gray-900">
          Install on GitHub
        </button>
      </a>
    </nav>
  );
}

export default Navbar;
