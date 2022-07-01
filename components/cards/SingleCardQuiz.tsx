import Link from "next/link";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useState,
} from "react";
import { EntriesContext } from "../../context/entries";
import { Entry } from "../../interfaces";
import { ContainerCard } from "../layouts/ContainerCard";
interface Props {
  entry: Entry;
}
const SingleCardQuiz = ({ entry }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <>
      <div className="w-96 mt-10">
        <ContainerCard>
          <h2 className="text-xl text-center mb-2">&#x1F4A1; Quiz</h2>
          <p className="text-center">¿Como traduces esto?</p>
          <h3 className="text-2xl text-center">{entry?.meaning}</h3>
          <button
            onClick={() => setShowAnswer(true)}
            className="m-auto mt-5 flex justify-center"
          >
            {!showAnswer && "Ver respuesta"}
          </button>
          {showAnswer && <p className="text-center"> {entry?.title}</p>}
          <div className="flex justify-around mt-5">
            <button>Seguir practicando</button>
            <button>La tengo!</button>
          </div>
        </ContainerCard>
      </div>
    </>
  );
};
export default SingleCardQuiz;
