import Link from "next/link";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useMemo,
  useState,
} from "react";
import { EntriesContext } from "../../context/entries";
import { Entry } from "../../interfaces";
import { ContainerCard } from "../layouts/ContainerCard";
interface Props {
  entry: Entry;
  entries: Entry[];
}
const SingleCardQuizOptions = ({ entry, entries }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const entriesByList = useMemo(
    () => entries.filter((item) => item.list === entry.list),
    [entries]
  );
  return (
    <>
      <div className="w-96 mt-10">
        <ContainerCard>
          <h2 className="text-xl text-center mb-2">&#x1F4A1; Quiz</h2>
          <p className="text-center">Elije una respuesta:</p>
          <h3 className="text-2xl text-center">{entry?.title}</h3>
          <ul>
            {entriesByList.map(({ meaning, id }) => (
              <li key={id}>{meaning}</li>
            ))}
          </ul>
        </ContainerCard>
      </div>
    </>
  );
};
export default SingleCardQuizOptions;
