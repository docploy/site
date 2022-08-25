import EmailSignup from 'components/EmailSignup';
import { GET_STARTED_URL } from 'constants/url';
import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Docploy</title>
      </Head>
      <div className="mb-12">
        <h1 className="font-bold mb-12 text-5xl text-center">
          Focus on writing your docs, and we will handle setup, testing, and
          deployment.
        </h1>
        <h2 className="m-auto max-w-3xl mb-12 text-3xl text-center text-slate-600">
          Docploy tests your code blocks to make sure they work then deploys
          your docs. Set up on GitHub Actions in less than 5 minutes.
        </h2>
        <div className="text-center">
          <a href={GET_STARTED_URL}>
            <button className="bg-amber-400 font-bold hover:bg-amber-300 px-8 py-4 rounded text-2xl text-center text-gray-800">
              Get started now
            </button>
          </a>
        </div>
      </div>

      <div className="mb-24">
        <h3 className="mb-4 text-center text-slate-500 text-xl">
          Sign up for our mailing list to receive updates{' '}
        </h3>
        <EmailSignup event="Subscribe (Landing Page)" />
      </div>

      <div className="gap-x-8 grid grid-cols-2 mb-24">
        <div>
          <Image
            src="/snippet.gif"
            alt="Show how raw code looks in snippet"
            width="522"
            height="320"
          />
        </div>
        <div>
          <h3 className="font-bold text-3xl mb-4">
            Test your code blocks before deploying
          </h3>
          <p className="text-lg">
            Wrap your Javascript code snippet in a Jest test, and we wait for a
            successful run before deploying your docs. A green checkmark is
            shown in the bottom right of the code snippet to give your users
            confidence that your code is working.
          </p>
        </div>
      </div>

      <div className="gap-x-8 grid grid-cols-2 mb-24">
        <div>
          <h3 className="font-bold text-3xl mb-4">
            Deploy a documentation site by pointing to a folder
          </h3>
          <p className="text-lg">
            You never have to worry about setting up any documentation software.
            Just put Markdown files into a folder, and we deploy a dedicated
            documentation site to GitHub Pages.
          </p>
        </div>
        <div>
          <Image
            src="/deploy.gif"
            alt="Show how a Markdown folder gets deployed to a site"
            width="522"
            height="320"
          />
        </div>
      </div>

      <div className="mb-24">
        <h3 className="font-bold text-3xl mb-8 text-center">
          Comparsion to other documentation
        </h3>
        <div className="gap-x-8 grid grid-cols-2 mb-32">
          <div>
            <h3 className="text-2xl mb-4">Wikis</h3>
            <p className="text-lg">
              Wikis are a good solution for reading and writing static content.
              Code snippets can often go out of date. Docs are not synced with
              your code, so code snippets can go out of date without anybody
              knowing.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-16 top-4">
              <Image
                src="/confluence.png"
                alt="Confluence logo"
                width="183"
                height="32"
              />
            </div>
            <div className="absolute right-32 top-20">
              <Image
                src="/notion.png"
                alt="Notion logo"
                width="120"
                height="42"
              />
            </div>
            <div className="absolute left-32 top-36">
              <Image
                src="/google-docs.png"
                alt="Google Docs logo"
                width="175"
                height="75"
              />
            </div>
          </div>
        </div>

        <div className="gap-x-8 grid grid-cols-2 mb-24">
          <div className="relative">
            <div className="absolute left-16 top-4">
              <Image
                src="/mkdocs.jpeg"
                alt="MkDocs logo"
                width="152"
                height="47"
              />
            </div>
            <div className="absolute right-24 top-20">
              <Image
                src="/docusaurus.png"
                alt="Docusaurus logo"
                width="200"
                height="100"
              />
            </div>
            <div className="absolute left-32 top-48">
              <Image
                src="/gitbook.svg"
                alt="GitBook logo"
                width="175"
                height="75"
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl mb-4">Static Site Generators</h3>
            <p className="text-lg">
              Static site generators are a good solution when you need ultimate
              customizability and have engineering resources to maintain the
              documentation as its own product. Without dedicated engineering
              resources, they can be time consuming to set up and maintain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
