import React, { FC, useContext, useMemo } from "react";
import { ListStatus } from "../../interfaces";
import SingleList from "./SingleList";
import { ListsContext } from "../../context/lists/ListsContext";

interface Props {
  status: ListStatus;
}

const ListsList: FC<Props> = ({ status }) => {
  const { lists } = useContext(ListsContext);
  const listsByStatus = useMemo(
    () => lists.filter((list) => list.status === status),
    [lists]
  );
  console.log("listsByStatus", listsByStatus);
  return (
    <>
      <div className="grid grid-cols-12 gap-2 w-full">
        {listsByStatus.map((lists) => (
          <div key={lists._id} className="col-span-6">
            <SingleList list={lists} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ListsList;
