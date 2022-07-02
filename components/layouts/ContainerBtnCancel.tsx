interface Props {
  children?: React.ReactNode;
}
export const ContainerBtnCancel = ({ children }: Props) => {
  return (
    <div className="self-center mt-2 px-5 py-1 text-lg rounded-md hover:border-gray-600 hover:text-gray-900 text-gray-700 font-semibold cursor-default border-solid border-2 border-gray-400 ">
      {children}
    </div>
  );
};
