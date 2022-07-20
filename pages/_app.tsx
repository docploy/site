import '../styles/globals.css';

import type { AppProps } from 'next/app';
import PlausibleProvider from 'next-plausible';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="docploy.com" trackOutboundLinks>
      <Component {...pageProps} />;
    </PlausibleProvider>
  );
}

export default MyApp;
