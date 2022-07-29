import React, { FC, useContext, useMemo } from "react";
import { ListStatus } from "../../interfaces";
import SingleList from "./SingleList";
import { ListsContext } from "../../context/lists/ListsContext";

interface Props {
  status: ListStatus;
}

const ListsList: FC<Props> = ({ status }) => {
  const { lists } = useContext(ListsContext);
  // const listsByStatus = useMemo(
  //   () => lists.filter((list) => list.status === status),
  //   [lists]
  // );
  return (
    <>
      <div className="grid grid-cols-12 gap-5 w-full">
        {lists
          .sort((a, b) => (a.pinned < b.pinned ? 1 : -1))
          .map((lists) => (
            <div key={lists._id} className="col-span-3 mt-8">
              <SingleList list={lists} />
            </div>
          ))}
      </div>
    </>
  );
};

export default ListsList;
