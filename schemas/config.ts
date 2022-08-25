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
        content: {
          type: String,
          required: true,
        },
        language: {
          type: String,
        },
      },
    },
    link: {
      ...nodes.link,
      render: 'Link',
    },
  },
};

export default config;
