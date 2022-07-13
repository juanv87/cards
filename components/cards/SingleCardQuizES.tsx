import Link from "next/link";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { EntriesContext } from "../../context/entries";
import { Entry, List } from "../../interfaces";
import { ContainerCard } from "../layouts/ContainerCard";
import { createApi } from "unsplash-js";
import PhotoExample from "../StockPhotos/PhotoExample";
import useGetImageByTitleValue from "../hooks/useGetImageByTitleValue";

interface Props {
  entries: Entry[];
  listSlug: string;
}

const SingleCardQuizES = ({ entries, listSlug }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const entryBySlug = useMemo(
    () => entries.filter(({ list }) => list === listSlug),
    [entries]
  );
  const randomEntry =
    entryBySlug[Math.floor(Math.random() * entryBySlug.length)];

  const image = useGetImageByTitleValue(randomEntry.title);

  return (
    <>
      <div className="w-96 mt-10">
        <ContainerCard>
          <h2 className="text-xl text-center mb-2">&#x1F4A1; Quiz</h2>
          <p className="text-center mb-2">¿Como traduces esto?</p>
          <h3 className="text-2xl text-center mb-5">{randomEntry?.meaning}</h3>
          <p className="text-center blur-sm hover:blur-0 text-lg">
            {" "}
            {randomEntry?.title}
          </p>
          <hr className="my-5" />
          <div className="flex justify-around">
            <button>Seguir practicando</button>
            <button>La tengo!</button>
          </div>
        </ContainerCard>
      </div>
    </>
  );
};
export default SingleCardQuizES;
