import React, { FC, useContext, useMemo } from "react";
import { EntryStatus } from "../../interfaces";
import SingleCard from "./SingleCard";
import { EntriesContext } from "../../context/entries/EntriesContext";

interface Props {
  status: EntryStatus;
}

const CardsList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );
  console.log("entriesByStatus", entriesByStatus);
  return (
    <>
      <div className="grid grid-cols-12 gap-2 w-full">
        {entriesByStatus.map((entry) => (
          <div key={entry._id} className="col-span-6">
            <SingleCard entry={entry} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CardsList;
