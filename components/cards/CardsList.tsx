import React, { FC, useContext, useMemo, useState, useEffect } from "react";
import { Entry, EntryStatus } from "../../interfaces";
import SingleCard from "./SingleCard";
import { EntriesContext } from "../../context/entries/EntriesContext";
import SingleCardQuiz from "./SingleCardQuiz";
import SingleCardQuizOptions from "./SingleCardQuizOptions";
import FilterByEntries from "../FilterByEntries";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
import { authContext } from "../../context/authContext";
import { useAuth } from "../hooks/useAuth";
import useGetLists from "../hooks/useGetLists";

const CardsList: FC = () => {
  // const { entries } = useContext(EntriesContext);

  const { lists, loadingLists } = useGetLists();

  return (
    <>
      <div className="flex gap-5">
        {/* <SingleCardQuiz entries={entries} /> */}
        {/* <SingleCardQuizOptions entries={entries} entry={randomEntry} /> */}
      </div>
      {/* <FilterByEntries entries={entries} /> */}
      {console.log(lists)}
      {loadingLists ? (
        "Cargando..."
      ) : lists.length > 0 ? (
        <div className="grid grid-cols-12 gap-5 w-full">
          {lists?.map((entry: any) => (
            <div key={entry.id} className="col-span-4 mt-8">
              <SingleCard entry={entry} />
            </div>
          ))}
        </div>
      ) : (
        "No hay cards"
      )}
    </>
  );
};

export default CardsList;
