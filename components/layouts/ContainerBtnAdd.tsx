interface Props {
  children?: React.ReactNode;
}
export const ContainerBtnAdd = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-2 rounded-full hover:bg-green-700 bg-green-600 p-3 shadow-md text-white font-semibold text-xl pr-5">
      {children}
    </div>
  );
};
