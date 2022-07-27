import 'prismjs/themes/prism-okaidia.css';

import prismjs from 'prismjs';

type Props = {
  children: string;
  language?: string;
};

function Fence(props: Props) {
  const { children, language = 'text' } = props;
  const html = prismjs.highlight(
    children,
    prismjs.languages[language],
    language
  );

  return (
    <pre
      className={`language-${language} rounded-md !text-sm !p-6`}
      dangerouslySetInnerHTML={{ __html: html }}
    ></pre>
  );
}

export default Fence;
