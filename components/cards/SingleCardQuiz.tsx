import Link from "next/link";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useMemo,
  useState,
} from "react";
import { EntriesContext } from "../../context/entries";
import { Entry, List } from "../../interfaces";
import { ContainerCard } from "../layouts/ContainerCard";
interface Props {
  entries: Entry[];
  entrySlug?: string;
}
const SingleCardQuiz = ({ entries, entrySlug }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [reloadCard, setReloadCard] = useState(true);
  const entriesByList = useMemo(
    () => entries.filter(({ list }) => list === entrySlug || list),
    [entries]
  );

  const entry = entriesByList[Math.floor(Math.random() * entriesByList.length)];
  const entryFix =
    entriesByList[Math.floor(Math.random() * entriesByList.length)];

  let memoCountValue = entry?.memoCount;

  const { updateEntry } = useContext(EntriesContext);
  const newEntryUpdate = {
    ...entry,
    memoCount: memoCountValue + 1,
  };

  const onIGotIt = () => {
    updateEntry(newEntryUpdate);
  };
  const onKeepTrying = () => {
    setReloadCard(!reloadCard);
    setTimeout(() => setReloadCard(true), 1);
  };

  return (
    <>
      <div className="w-96 mt-10">
        {reloadCard && (
          <ContainerCard>
            <h2 className="text-xl text-center mb-2">&#x1F4A1; Quiz</h2>
            <p className="text-center mb-2">¿Como traduces esto?</p>
            <h3 className="text-2xl text-center mb-5">{entry?.title}</h3>
            <p className="text-center blur-sm hover:blur-0 text-lg">
              {entry?.meaning}
            </p>
            <hr className="my-5" />
            <div className="flex justify-center items-center gap-5">
              <button onClick={onKeepTrying}>Seguir practicando</button>
              <button onClick={onIGotIt}>La sé!</button>
            </div>
          </ContainerCard>
        )}
      </div>
    </>
  );
};
export default SingleCardQuiz;
