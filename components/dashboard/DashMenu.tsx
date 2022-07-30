import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { ListsContext } from "../../context/lists";
import { NotesContext } from "../../context/notes";
import IconFavMenu from "../icons/IconFavMenu";
import IconListCardsMenu from "../icons/IconListCardsMenu";
import IconListsMenu from "../icons/IconListsMenu";
import IconNote from "../icons/IconNote";
import IconSingleListMenu from "../icons/IconSingleListMenu";
import LoaderLists from "../loaders/LoaderLists";

export const DashMenu = ({ showItems = true, showMenu = true }) => {
  // const { lists } = useContext(ListsContext);
  // const { notes } = useContext(NotesContext);

  return (
    <>
      <ul>
        <li>
          <div className="flex items-center gap-2">
            <IconListCardsMenu size={showMenu ? "30" : "40"} />
            <Link href="/dashboard/cards">
              <a className={`text-lg ${!showMenu && "hidden"}`}>Cards</a>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <IconListsMenu size={showMenu ? "30" : "40"} />
            <Link href="/dashboard/lists">
              <a className={`text-lg ${!showMenu && "hidden"}`}>Lists</a>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <IconNote size={showMenu ? "30" : "40"} />
            <Link href="/dashboard/notes">
              <a className={`text-lg ${!showMenu && "hidden"}`}>Notes</a>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <IconFavMenu size={showMenu ? "30" : "40"} />
            <Link href="/dashboard/favs">
              <a className={`text-lg ${!showMenu && "hidden"}`}>Favs</a>
            </Link>
          </div>
        </li>
      </ul>
      <style jsx>{`
        ul {
          padding-left: 10px;
          padding-top: 10px;
        }
        ul li {
          margin-bottom: 5px;
          padding: 5px 0;
        }
      `}</style>
    </>
  );
};
