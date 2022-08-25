import '../styles/globals.css';
import '../styles/spinner.css';

import Alert from 'components/Alert';
import AlertProvider from 'contexts/alert';
import type { AppProps } from 'next/app';
import Navbar from 'components/Navbar';
import PlausibleProvider from 'next-plausible';
import UserProvider from 'contexts/user';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <PlausibleProvider domain="docploy.com" trackOutboundLinks>
        <AlertProvider>
          <Alert />
          <div className="m-8">
            <div className="m-auto max-w-5xl">
              <nav>
                <Navbar />
              </nav>
              <main className="m-auto my-12 min-h-screen w-full">
                <Component {...pageProps} />
              </main>
              <footer className="text-center text-gray-500">
                <p>© Docploy</p>
              </footer>
            </div>
          </div>
        </AlertProvider>
      </PlausibleProvider>
    </UserProvider>
  );
}

export default MyApp;
