interface Props {
  children?: React.ReactNode;
}
export const ContainerBtnSave = ({ children }: Props) => {
  return (
    <div className="self-center mt-2 px-3 py-1 text-lg border-solid bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold cursor-default">
      {children}
    </div>
  );
};
