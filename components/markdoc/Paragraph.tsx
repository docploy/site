type Props = {
  children: React.ReactNode;
};

function Paragraph(props: Props) {
  const { children } = props;
  return <p className="mb-8 text-md text-gray-700 leading-loose">{children}</p>;
}

export default Paragraph;
