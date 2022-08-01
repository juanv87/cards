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

const CardsList: FC = () => {
  // const { entries } = useContext(EntriesContext);

  const { user } = useAuth();
  const emailUser = user && user.email;
  const [cards, setCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);

  const getData = async () => {
    if (user) {
      setLoadingCards(true);
      const colRef = collection(db, "usuarios", emailUser, "general");
      const data = await getDocs(colRef);
      setCards(user && data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <>
      <div className="flex gap-5">
        {/* <SingleCardQuiz entries={entries} /> */}
        {/* <SingleCardQuizOptions entries={entries} entry={randomEntry} /> */}
      </div>
      {/* <FilterByEntries entries={entries} /> */}
      {console.log(cards)}
      {loadingCards ? (
        "Cargando..."
      ) : cards.length > 0 ? (
        <div className="grid grid-cols-12 gap-5 w-full">
          {cards?.map((entry: any) => (
            <div key={entry.id} className="col-span-4 mt-8">
              <SingleCard key={entry.id} entry={entry} />
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
