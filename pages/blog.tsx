import type { GetStaticProps, NextPage } from 'next';

import BlogSummary from 'components/BlogSummary';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { format } from 'date-fns';
import fs from 'fs';
import glob from 'glob-promise';
import matter from 'gray-matter';
import path from 'path';

type Summary = {
  title: string;
  date: string;
  summary: string;
  slug: string;
};

type Props = {
  posts: Summary[];
};

interface Params extends ParsedUrlQuery {
  docPath: string;
  slug: string[];
}

const POSTS_DIR = path.join(process.cwd(), 'posts');

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postPaths = await glob(path.join(POSTS_DIR, '**/*.md'));
  const posts = postPaths.map((postPath: string) => {
    const slug = path.basename(postPath, path.extname(postPath));
    const source = fs.readFileSync(postPath, 'utf-8');
    const matterResult = matter(source);
    const { title, date, summary } = matterResult.data;

    return {
      title,
      date,
      summary,
      slug,
    };
  });
  const sortedPosts = posts.sort((a, b) => b.date - a.date);

  // Need to parse the post Dates into Strings because props expects all data to be JSON-serializable
  const parsedDatePosts = sortedPosts.map((post) => {
    return {
      ...post,
      date: format(post.date, 'MM/dd/yyyy'),
    };
  });
  return { props: { posts: parsedDatePosts } };
};

const Blog: NextPage<Props> = (props) => {
  const { posts } = props;
  return (
    <div>
      <Head>
        <title>Docploy Blog</title>
      </Head>

      <div className="m-auto max-w-2xl">
        {posts.map((post: Summary, i: number) => {
          return (
            <BlogSummary
              key={i}
              title={post.title}
              date={post.date}
              summary={post.summary}
              slug={post.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
