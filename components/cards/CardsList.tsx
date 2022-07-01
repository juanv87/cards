import React, { FC, useContext, useMemo } from "react";
import { EntryStatus } from "../../interfaces";
import SingleCard from "./SingleCard";
import { EntriesContext } from "../../context/entries/EntriesContext";
import SingleCardQuiz from "./SingleCardQuiz";
import SingleCardQuizOptions from "./SingleCardQuizOptions";

interface Props {
  status: EntryStatus;
}

const CardsList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );
  const randomEntry = entries[Math.floor(Math.random() * entries.length)];

  return (
    <>
      <div className="flex gap-5">
        <SingleCardQuiz entry={randomEntry} />
        <SingleCardQuizOptions entries={entries} entry={randomEntry} />
      </div>
      <div className="grid grid-cols-12 gap-5 w-full">
        {entriesByStatus.map((entry) => (
          <div key={entry._id} className="col-span-4 mt-8">
            <SingleCard entry={entry} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CardsList;
