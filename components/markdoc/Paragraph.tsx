type Props = {
  children: React.ReactNode;
};

function Paragraph(props: Props) {
  const { children } = props;
  return <p className="mb-4 text-lg text-gray-700 leading-loose">{children}</p>;
}

export default Paragraph;
