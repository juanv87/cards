import { DashMenu } from "../dashboard/DashMenu";

interface Props {
  children?: React.ReactNode;
}
export const ContainerDashBoard = ({ children }: Props) => {
  return (
    <div className="mx-auto px-3 mt-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-2 bg-gray-500">
          <DashMenu />
        </div>
        <div className="col-span-10">{children}</div>
      </div>
    </div>
  );
};
