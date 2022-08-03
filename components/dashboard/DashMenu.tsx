import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { ListsContext } from "../../context/lists";
import { NotesContext } from "../../context/notes";
import { useAuth } from "../hooks/useAuth";
import useGetLists from "../hooks/useGetLists";
import IconFavMenu from "../icons/IconFavMenu";
import IconListCardsMenu from "../icons/IconListCardsMenu";
import IconListsMenu from "../icons/IconListsMenu";
import IconNote from "../icons/IconNote";
import IconSingleListMenu from "../icons/IconSingleListMenu";
import LoaderLists from "../loaders/LoaderLists";

export const DashMenu = ({ showItems = true, showMenu = true }) => {
  // const { lists } = useContext(ListsContext);
  // const { notes } = useContext(NotesContext);

  const { user } = useAuth();
  const userName = user && user.email.split("@")[0];
  const { lists, loadingLists } = useGetLists(userName);

  console.log("DashMenu", lists);

  return (
    <>
      <ul>
        {/* <li>
          <div className="flex items-center gap-2">
            <IconListCardsMenu size={showMenu ? "30" : "40"} />
            <Link href={`/${userName}/cards`}>
              <a className={`text-lg ${!showMenu && "hidden"}`}>Cards</a>
            </Link>
          </div>
        </li> */}
        <li>
          <div className="flex items-center gap-2">
            <IconListsMenu size={showMenu ? "30" : "40"} />
            <Link href={`/${userName}/lists`}>
              <a className={`text-lg ${!showMenu && "hidden"}`}>Lists</a>
            </Link>
          </div>
        </li>
        <li>
          {showItems && (
            <ul>
              {lists.length === 0 ? (
                <>
                  <div className="mt-5">
                    <LoaderLists />
                  </div>
                </>
              ) : (
                lists
                  // .sort((a, b) => (a.pinned < b.pinned ? 1 : -1))
                  .map(({ title, id, chosenEmoji, pinned }) => (
                    <li key={id}>
                      <div className="flex items-center gap-1 justify-between">
                        <a className="flex" href={`/${userName}/lists/${id}`}>
                          {chosenEmoji ? (
                            <span
                              className={showMenu ? "text-base" : "text-xl"}
                            >
                              {chosenEmoji}
                            </span>
                          ) : (
                            <IconSingleListMenu size={showMenu ? "25" : "30"} />
                          )}
                          <span
                            className={`text-base ml-2 ${
                              !showMenu && "hidden"
                            } `}
                          >
                            {title}
                          </span>
                        </a>
                        {pinned && (
                          <>
                            <div className="mr-3 text-sm opacity-50">📌</div>
                          </>
                        )}
                      </div>
                    </li>
                  ))
              )}
            </ul>
          )}
        </li>
        {/* <li>
          <div className="flex items-center gap-2">
            <IconNote size={showMenu ? "30" : "40"} />
            <Link href={`/${userName}/notes`}>
              <a className={`text-lg ${!showMenu && "hidden"}`}>Notes</a>
            </Link>
          </div>
        </li> */}
        {/* <li>
          <div className="flex items-center gap-2">
            <IconFavMenu size={showMenu ? "30" : "40"} />
            <Link href={`/${userName}/favs`}>
              <a className={`text-lg ${!showMenu && "hidden"}`}>Favs</a>
            </Link>
          </div>
        </li> */}
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
