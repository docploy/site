import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Navbar from 'components/Navbar';
import PlausibleProvider from 'next-plausible';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="docploy.com" trackOutboundLinks>
      <div className="m-8">
        <div className="m-auto max-w-7xl">
          <nav>
            <Navbar />
          </nav>
          <main className="m-auto max-w-4xl my-12">
            <Component {...pageProps} />
          </main>
          <footer className="text-center text-gray-500">
            <h1>© Docploy</h1>
          </footer>
        </div>
      </div>
    </PlausibleProvider>
  );
}

export default MyApp;
