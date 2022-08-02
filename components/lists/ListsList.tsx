import React, { FC, useContext, useMemo } from "react";
import { ListStatus } from "../../interfaces";
import SingleList from "./SingleList";
import { ListsContext } from "../../context/lists/ListsContext";
import useGetLists from "../hooks/useGetLists";

const ListsList = ({lists}: any) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-5 w-full">
        {/* {lists
          .sort((a, b) => (a.pinned < b.pinned ? 1 : -1))
          .map((lists) => (
            <div key={lists.id} className="col-span-3 mt-8">
              <SingleList list={lists} />
            </div>
          ))} */}
        {!lists
          ? "Cargando..."
          : lists.length > 0
          ? lists?.map((entry: any) => (
              <div key={entry.id} className="col-span-4 mt-8">
                <SingleList list={entry} />
              </div>
            ))
          : "No hay cards"}
      </div>
    </>
  );
};

export default ListsList;
