import React, { useMemo, useState, useEffect } from "react";
import { Entry } from "../../interfaces";
import { useGetDefinitionsByWord } from "../hooks/useGetDefinitionsByWord";
import { ContainerCard } from "../layouts/ContainerCard";
interface Props {
  entries: Entry[];
  listSlug: string;
}
const SingleCardQuizWithDesc = ({ entries, listSlug }: Props) => {
  const entryBySlug = useMemo(
    () => entries.filter(({ list }) => list === listSlug),
    [entries]
  );

  const randomEntry =
    entryBySlug[Math.floor(Math.random() * entryBySlug.length)];

  return (
    <>
      <div className="w-96 mt-10">
        <ContainerCard>
          <h2 className="text-xl text-center mb-2">&#x1F4A1; Quiz</h2>
          <p className="text-center mb-2">¿De qué otra forma lo dirías?</p>
          <h3 className="text-2xl text-center mb-5">
            {randomEntry?.description || randomEntry?.title}
          </h3>

          <p className="text-center blur-sm hover:blur-0 text-lg">
            {" "}
            {!randomEntry?.description
              ? randomEntry?.meaning
              : randomEntry?.title}
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
export default SingleCardQuizWithDesc;
