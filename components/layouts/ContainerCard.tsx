interface Props {
  children?: React.ReactNode;
}
export const ContainerCard = ({ children }: Props) => {
  return (
    <div className="bg-white border-t-8 shadow-xl hover:border-gray-300 border-gray-200 p-5 rounded-lg relative overflow-auto">
      {children}
    </div>
  );
};
