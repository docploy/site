type Props = {
  children: string;
};

function Code({ children }: Props) {
  return (
    <code className="text-sm px-2 py-1 text-blue-600 bg-blue-100 rounded-md">
      {children}
    </code>
  );
}

export default Code;
