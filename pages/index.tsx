import CodeSnippet from 'components/CodeSnippet';
import DeployOutput from 'components/DeployOutput';
import EmailSignup from 'components/EmailSignup';
import { GITHUB_ACTION_URL } from 'constants/url';
import Head from 'next/head';
import LinkOutput from 'components/LinkOutput';
import Navbar from 'components/Navbar';
import type { NextPage } from 'next';
import RulesOutput from 'components/RulesOutput';
import Script from 'next/script';

const Home: NextPage = () => {
  return (
    <div className="m-8">
      <Head>
        <title>Docploy</title>
      </Head>

      {/* Import Plausible Analytics script */}
      <Script
        defer
        data-domain="docploy.com"
        src="https://plausible.io/js/plausible.js"
      ></Script>

      <div className="m-auto max-w-7xl">
        <nav>
          <Navbar />
        </nav>

        <main className="m-auto max-w-4xl my-12">
          <div className="mb-12">
            <h1 className="font-bold mb-12 text-5xl text-center">
              Save your developers time with always up-to-date documentation
            </h1>
            <h2 className="m-auto max-w-2xl mb-12 text-3xl text-center text-slate-600">
              Docploy checks your technical documentation against your code and
              standardizes everyone&apos;s writing style. Set up in 5 minutes.
            </h2>
            <div className="text-center">
              <a href={GITHUB_ACTION_URL}>
                <button className="bg-amber-400 font-bold hover:bg-amber-300 px-8 py-4 rounded text-2xl text-center text-gray-800">
                  Install on GitHub
                </button>
              </a>
            </div>
          </div>

          <div className="mb-24">
            <EmailSignup />
          </div>

          <div className="gap-x-4 grid grid-cols-2 mb-24">
            <div>
              <h3 className="text-3xl mb-4">
                Deploys a sandboxed documentation site
              </h3>
              <p className="text-xl">
                Each pull request triggers an action to deploy your
                documentation to a staging environment where reviewers can
                preview any changes.
              </p>
            </div>
            <div>
              <DeployOutput />
            </div>
          </div>

          <div className="gap-x-4 grid grid-cols-2 mb-24">
            <div>
              <CodeSnippet />
            </div>
            <div>
              <h3 className="text-3xl mb-4">
                Never worry about your code examples going out-of-date
              </h3>
              <p className="text-xl">
                Every build tests each code example to make sure that they still
                work with the codebase.
              </p>
            </div>
          </div>

          <div className="gap-x-4 grid grid-cols-2 mb-24">
            <div>
              <h3 className="text-3xl mb-4">
                Enforce rules to guarantee a consistent style across every page
              </h3>
              <p className="text-xl">
                Developers no longer need to read style guides. Writers no
                longer have to block pull requests for small inconsistencies.
                The result is documentation gets merged in sooner.
              </p>
            </div>
            <div>
              <RulesOutput />
            </div>
          </div>

          <div className="gap-x-4 grid grid-cols-2 mb-24">
            <div>
              <LinkOutput />
            </div>
            <div>
              <h3 className="text-3xl mb-4">Check every link</h3>
              <p className="text-xl">
                Every build will check each link in the documentation to make
                sure they go to a valid website.
              </p>
            </div>
          </div>
        </main>

        <footer className="text-center text-gray-500">
          <h1>© Docploy</h1>
        </footer>
      </div>
    </div>
  );
};

export default Home;
