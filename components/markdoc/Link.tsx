type Props = {
  children: React.ReactNode;
  href: string;
};

function Link(props: Props) {
  const { children, href } = props;
  return (
    <a href={href} className="text-blue-400 underline">
      {children}
    </a>
  );
}

export default Link;
