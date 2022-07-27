import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import BlogPost from 'components/BlogPost';
import Head from 'next/head';
import Markdoc from '@markdoc/markdoc';
import { ParsedUrlQuery } from 'querystring';
import config from 'schemas/config';
import { format } from 'date-fns';
import fs from 'fs';
import glob from 'glob-promise';
import matter from 'gray-matter';
import path from 'path';

type Props = {
  content: string;
  title: string;
  date: string;
};

interface Params extends ParsedUrlQuery {
  docPath: string;
  slug: string[];
}

const POSTS_DIR = path.join(process.cwd(), 'posts');

export const getStaticPaths: GetStaticPaths = async () => {
  const postPaths = await glob(path.join(POSTS_DIR, '**/*.md'));

  const paths = postPaths.map((postPath: string) => {
    const slug = path.basename(postPath, path.extname(postPath));
    return { params: { slug } };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { params } = context;
  const slug = params?.slug || [];
  const fullPath = path.join(POSTS_DIR, slug + '.md');
  const source = fs.readFileSync(fullPath, 'utf-8');
  const matterResult = matter(source);
  const {
    data: { title, date },
  } = matterResult;

  const ast = Markdoc.parse(source);
  const content = JSON.stringify(Markdoc.transform(ast, config));

  return {
    props: {
      content,
      title,
      date: format(date, 'MM/dd/yyyy'),
    },
  };
};

const BlogPostPage: NextPage<Props> = (props) => {
  const { content, title, date } = props;
  const parsedContent = JSON.parse(content);

  return (
    <div>
      <Head>
        <title>{`${title} - Docploy Blog`}</title>
      </Head>

      <div className="m-auto max-w-3xl">
        <BlogPost content={parsedContent} title={title} date={date} />
      </div>
    </div>
  );
};

export default BlogPostPage;
