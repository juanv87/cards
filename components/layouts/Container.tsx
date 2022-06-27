interface Props {
  children?: React.ReactNode;
}
export const Container = ({ children }: Props) => {
  return <div className="container mx-auto px-3 md:px-0">{children}</div>;
};
