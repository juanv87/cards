import { GetStaticPaths, GetServerSideProps } from "next";
import React, { useContext, useMemo, useState } from "react";
import { ContainerDashBoard } from "../../../components/layouts/ContainerDashBoard";
import { Header } from "../../../components/layouts/Header";
import { EntriesContext } from "../../../context/entries/EntriesContext";
import SingleCard from "../../../components/cards/SingleCard";
import IconAddCard from "../../../components/icons/IconAddCard";
import AddCard from "../../../components/cards/AddCard";
import SingleCardQuiz from "../../../components/cards/SingleCardQuiz";
import SingleCardQuizWithDesc from "../../../components/cards/SingleCardQuizWithDesc";
import SingleCardQuizES from "../../../components/cards/SingleCardQuizES";
import { dbLists } from "../../../database";
import { List } from "../../../interfaces";
import LoaderCards from "../../../components/loaders/LoaderCards";

interface Props {
  list: List;
}

const SingleListPage = ({ list }: Props) => {
  console.log("LIST", list);

  // todo: traer listas filtradas por el id
  const { title, slugTitleValue, chosenEmoji, description } = list;
  const [addCard, setAddCard] = useState(false);
  const { entries } = useContext(EntriesContext);
  const entryBySlug = useMemo(
    () => entries.filter(({ list }) => list === slugTitleValue),
    [entries]
  );

  return (
    <>
      <Header />
      <ContainerDashBoard>
        <div className="w-full mt-10">
          <div className="flex items-center gap-2 mt-5">
            <div className="text-5xl">{chosenEmoji}</div>
            <h2 className="text-5xl font-semibold">{title}</h2>
          </div>
          {description && (
            <div
              className="max-h-72 mt-5 text-lg pb-5 text-gray-800 content max-w-full pr-5"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}
          <button className="" onClick={() => setAddCard(!addCard)}>
            <div className="flex items-center gap-2 rounded-full bg-green-600 p-3 shadow-md fixed z-50 right-20 bottom-20">
              <IconAddCard color="white" />
            </div>
          </button>
        </div>
        {addCard && <AddCard currentList={slugTitleValue} />}
        <div className="flex gap-5">
          <SingleCardQuiz entrySlug={slugTitleValue} entries={entries} />
          <SingleCardQuizWithDesc
            entrySlug={slugTitleValue}
            entries={entries}
          />
          <SingleCardQuizES entrySlug={slugTitleValue} entries={entries} />
        </div>

        {entryBySlug.length === 0 && <LoaderCards />}
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

export default SingleListPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log("params", params);

  const { id } = params as {
    id: string;
  };

  const list = await dbLists.getListById(id);
  //const entriesByList = await dbLists.getEntriesByList()

  if (!list) {
    return {
      redirect: {
        destination: "/dashboard/cards",
        permanent: false,
      },
    };
  }

  return {
    props: {
      list,
    },
  };
};
