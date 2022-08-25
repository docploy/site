import 'prismjs/components/prism-core';

import Highlight, { Language, defaultProps } from 'prism-react-renderer';

import okaidia from 'prism-react-renderer/themes/okaidia';

type Props = {
  children: string;
  language: string;
};

function Fence({ children, language }: Props) {
  console.log('children', children);
  return (
    <div className="bg-slate-800 my-4 overflow-x-auto px-8 pt-4 relative rounded-lg">
      <Highlight
        {...defaultProps}
        code={children}
        language={language as Language}
        theme={okaidia}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className + ' !text-sm !bg-slate-800 !p-0'}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export default Fence;
