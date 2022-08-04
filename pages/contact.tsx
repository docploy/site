import Contact from 'components/Contact';
import Head from 'next/head';

function Pricing() {
  return (
    <div>
      <Head>
        <title>Docploy Contact</title>
      </Head>

      <h1 className="font-bold mb-4 text-5xl text-center">Contact us</h1>
      <h2 className="m-auto max-w-2xl mb-12 text-2xl text-center text-slate-500">
        Send us a message about support or pricing
      </h2>

      <Contact />
    </div>
  );
}

export default Pricing;
