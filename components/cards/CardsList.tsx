import React, { FC, useContext, useMemo, useState, useEffect } from "react";
import { EntryStatus } from "../../interfaces";
import SingleCard from "./SingleCard";
import { EntriesContext } from "../../context/entries/EntriesContext";
import SingleCardQuiz from "./SingleCardQuiz";
import SingleCardQuizOptions from "./SingleCardQuizOptions";
import FilterByEntries from "../FilterByEntries";

const CardsList: FC = () => {
  // const entriesByStatus = useMemo(
  //   () => entries.filter((entry) => entry.status === status),
  //   [entries]
  // );
  // const randomEntry = entries[Math.floor(Math.random() * entries.length)];

  const { entries } = useContext(EntriesContext);

  return (
    <>
      <div className="flex gap-5">
        {/* <SingleCardQuiz entries={entries} /> */}
        {/* <SingleCardQuizOptions entries={entries} entry={randomEntry} /> */}
      </div>
      <FilterByEntries entries={entries} />
    </>
  );
};

export default CardsList;
