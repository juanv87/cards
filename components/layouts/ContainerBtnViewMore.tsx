interface Props {
  children?: React.ReactNode;
}
export const ContainerBtnViewMore = ({ children }: Props) => {
  return (
    <div className="self-center mt-2 px-3 py-1 text-lg border-solid bg-slate-500 hover:bg-slate-600 rounded-md text-white font-semibold cursor-default">
      {children}
    </div>
  );
};
