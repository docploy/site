import { ArrowRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

type Props = {
  title: string;
  date: string;
  summary: string;
  slug: string;
};

function BlogSummary(props: Props) {
  const { title, summary, slug } = props;
  const postUrl = '/blog/' + slug;
  return (
    <div className="mb-16">
      <Link href={postUrl}>
        <h1 className="font-bold text-2xl mb-4 cursor-pointer">{title}</h1>
      </Link>
      <p className="mb-4 text-gray-600">{summary}</p>
      <Link href={postUrl}>
        <a className="flex-row font-bold text-blue-600 items-center inline-flex">
          <span className="pr-1">Continue reading</span>
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </Link>
    </div>
  );
}

export default BlogSummary;
