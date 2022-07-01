import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { ListsContext } from "../../context/lists";
import IconFavMenu from "../icons/IconFavMenu";
import IconListCardsMenu from "../icons/IconListCardsMenu";
import IconListsMenu from "../icons/IconListsMenu";
import IconSingleListMenu from "../icons/IconSingleListMenu";
import LoaderLists from "../loaders/LoaderLists";

export const DashMenu = () => {
  const { lists } = useContext(ListsContext);
  console.log(lists);

  return (
    <>
      <ul>
        <li>
          <div className="flex items-center gap-2">
            <IconListCardsMenu />
            <Link href="/dashboard/cards">
              <a>Cards</a>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <IconListsMenu />
            <Link href="/dashboard/lists">
              <a>Lists</a>
            </Link>
          </div>
          <ul>
            {lists.length === 0 ? (
              <>
                <div className="mt-5">
                  <LoaderLists />
                </div>
              </>
            ) : (
              lists.map(({ title, _id, slugTitleValue, chosenEmoji }) => (
                <li key={_id}>
                  <div className="flex items-center gap-1">
                    {chosenEmoji ? chosenEmoji : <IconSingleListMenu />}

                    <a
                      className="text-base"
                      href={`/dashboard/lists/${slugTitleValue}`}
                    >
                      {title}
                    </a>
                  </div>
                </li>
              ))
            )}
          </ul>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <IconFavMenu />
            <Link href="/dashboard/favs">
              <a>Favs</a>
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
        ul li a {
          font-size: 1.2em;
        }
      `}</style>
    </>
  );
};
