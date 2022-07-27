type Props = {
  level: number;
  children: React.ReactNode;
};

function switchHeading(props: Props) {
  const { children, level } = props;
  switch (level) {
    case 1:
      return <h1 className="font-bold text-3xl mb-4 mt-8">{children}</h1>;
    case 2:
      return <h2 className="font-bold text-xl mb-4 mt-8">{children}</h2>;
    case 3:
      return <h3 className="font-bold text-lg mb-4 mt-8">{children}</h3>;
  }
}

function Heading(props: Props) {
  return switchHeading(props);
}

export default Heading;
