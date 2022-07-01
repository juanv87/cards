import { DashMenu } from "../dashboard/DashMenu";

interface Props {
  children?: React.ReactNode;
}
export const ContainerDashBoard = ({ children }: Props) => {
  return (
    <div className="mx-auto bg-gray-100 h-vh">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-2 bg-gray-50 border-black border-r-4">
          <div className="mt-5 ml-5">
            <DashMenu />
          </div>
        </div>
        <div className="col-span-10 px-10 relative">{children}</div>
      </div>
    </div>
  );
};
