import { GetStaticPaths, GetStaticProps } from "next";
import React, { useContext, useMemo, useState } from "react";
import { ContainerDashBoard } from "../../../components/layouts/ContainerDashBoard";
import { Header } from "../../../components/layouts/Header";
import { ListsContext } from "../../../context/lists";
import { EntriesContext } from "../../../context/entries/EntriesContext";
import { entriesApi } from "../../../api";
import { Entry } from "../../../interfaces";
import axios from "axios";
import SingleCard from "../../../components/cards/SingleCard";
import IconAddCard from "../../../components/icons/IconAddCard";
import AddCard from "../../../components/cards/AddCard";
import IconClose from "../../../components/icons/IconClose";
import SingleCardQuiz from "../../../components/cards/SingleCardQuiz";
import SingleCardQuizWithDesc from "../../../components/cards/SingleCardQuizWithDesc";

interface Props {
  entrySlug: string;
}

const SingleList = ({ entrySlug }: Props) => {
  // todo: traer listas filtradas por el id
  const [addCard, setAddCard] = useState(false);
  const { entries } = useContext(EntriesContext);
  const entryBySlug = useMemo(
    () => entries.filter(({ list }) => list === entrySlug),
    [entries]
  );

  const randomEntry =
    entryBySlug[Math.floor(Math.random() * entryBySlug.length)];
  return (
    <>
      <Header />
      <ContainerDashBoard>
        <div className="flex w-full mt-5 items-center justify-between px-5">
          <h2 className="text-2xl">{entrySlug}</h2>
          <button className="" onClick={() => setAddCard(!addCard)}>
            <div className="flex items-center gap-2">
              <IconAddCard />
              <div className="text-2xl"> Add card here</div>
            </div>
          </button>
        </div>
        {addCard && <AddCard currentList={entrySlug} />}
        <div className="flex gap-5">
          <SingleCardQuiz entry={randomEntry} />
          <SingleCardQuizWithDesc entry={randomEntry} />
        </div>

        <div className="grid grid-cols-12 gap-5 mt-8 w-full">
          {entryBySlug.map((entry) => (
            <div key={entry._id} className="col-span-4">
              <SingleCard entry={entry} />
            </div>
          ))}
        </div>
      </ContainerDashBoard>
    </>
  );
};

export default SingleList;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //const { data } = await entriesApi.get<Entry[]>("/entries/entriesByLists");
  //const { data } = await axios.get<Entry[]>("/entries/refreshEntries");
  return {
    props: { entrySlug: params?.slugTitleValue },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const lists = [
    {
      _id: "62bd0e0f02548509d55cd288",
      slugTitleValue: "phrasal-verbs",
    },
    {
      _id: "62bc992c594967939e8a12fb",
      slugTitleValue: "phrasal-verbs-2",
    },
    {
      _id: "62bc9f150698a5149b3fff81",
      slugTitleValue: "phrasal-verbs-2",
    },
  ];
  return {
    paths:
      lists.map(({ slugTitleValue }) => `/dashboard/lists/${slugTitleValue}`) ||
      [],
    fallback: "blocking",
  };
};
