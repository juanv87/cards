import { useState } from "react";
import { DashMenu } from "../dashboard/DashMenu";
import IconBack from "../icons/IconBack";
import IconClose from "../icons/IconClose";

interface Props {
  children?: React.ReactNode;
}
export const ContainerDashBoard = ({ children }: Props) => {
  const [showMenu, setShowMenu] = useState(true);
  const [showItems, setShowItems] = useState(true);
  const onColapseMenu = () => {
    setShowMenu(!showMenu);
  };
  const onColapseAll = () => {
    setShowItems(!showItems);
  };
  return (
    <div className="mx-auto bg-gray-100 h-vh">
      <div className="grid grid-cols-12 h-full">
        <div
          className={`${
            showMenu ? "col-span-2" : "col-span-1"
          } bg-gray-50 border-black shadow-lg relative`}
        >
          <header>
            <ul>
              <li onClick={onColapseAll}>Colapse</li>
            </ul>
          </header>
          <div className="mt-5 ml-5">
            <DashMenu showItems={showItems} showMenu={showMenu} />
          </div>
          <button
            onClick={onColapseMenu}
            className={`absolute ${
              !showMenu && "rotate-180"
            } z-50 top-5 -right-3 rounded-full bg-white shadow-sm p-1`}
          >
            <IconBack size="25" />
          </button>
        </div>
        <div
          className={`${
            showMenu ? "col-span-10" : "col-span-11"
          } px-10 relative`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
