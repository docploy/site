import Code from 'components/markdoc/Code';
import EmailSignup from 'components/EmailSignup';
import Fence from 'components/markdoc/Fence';
import Heading from 'components/markdoc/Heading';
import Link from 'components/markdoc/Link';
import Markdoc from '@markdoc/markdoc';
import Paragraph from 'components/markdoc/Paragraph';
import React from 'react';

type Props = {
  content: string;
  title: string;
  date: string;
};

const components = {
  Heading,
  Paragraph,
  Code,
  Fence,
  Link,
};

function BlogPost(props: Props) {
  const { content, title, date } = props;

  return (
    <div>
      <main className="mb-24 mt-16">
        <h1 className="font-bold mb-2 text-5xl leading-tight">{title}</h1>
        <div className="mb-8 text-gray-500">{date}</div>
        {Markdoc.renderers.react(content, React, {
          components,
        })}
      </main>

      <div>
        <h3 className="font-bold mb-2 text-center text-2xl">
          Subscribe to updates
        </h3>
        <h4 className="mb-4 text-center text-gray-500 text-xl">
          Sign up to receive the latest news and updates about Docploy
        </h4>
        <EmailSignup event="Subscribe (Blog Post)" />
      </div>
    </div>
  );
}

export default BlogPost;
