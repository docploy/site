import { Tag, nodes } from '@markdoc/markdoc';

const config = {
  nodes: {
    heading: {
      render: 'Heading',
      transform(node: any, config: any) {
        return new Tag(
          'Heading',
          {
            ...node.transformAttributes(config),
            level: node.attributes['level'],
          },
          node.transformChildren(config)
        );
      },
    },
    paragraph: {
      render: 'Paragraph',
    },
    code: {
      ...nodes.code,
      render: 'Code',
      transform(node: any, config: any) {
        const attributes = node.transformAttributes(config);
        return new Tag('Code', attributes, [node.attributes.content]);
      },
    },
    fence: {
      render: 'Fence',
      attributes: {
        content: { type: String, render: false, required: true },
        language: { type: String, render: 'language' },
        process: { type: Boolean, render: false, default: true },
      },
      transform(node: any, config: any) {
        const attributes = node.transformAttributes(config);
        const children = node.children.length
          ? node.transformChildren(config)
          : [node.attributes.content];

        return new Tag('Fence', attributes, children);
      },
    },
    link: {
      ...nodes.link,
      render: 'Link',
    },
  },
};

export default config;
