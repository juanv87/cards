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
import { dbLists, dbNotes } from "../../../database";
import { List, Note } from "../../../interfaces";
import LoaderCards from "../../../components/loaders/LoaderCards";
import SingleCardQuizNote from "../../../components/cards/SingleCardQuizNote";
import SingleNote from "../../../components/notes/SingleNote";
import AddNote from "../../../components/notes/AddNote";
import { ContainerBtnAdd } from "../../../components/layouts/ContainerBtnAdd";

interface Props {
  list: List;
  notesByList: Note[];
}

const SingleListPage = ({ list, notesByList }: Props) => {
  console.log("notesByList", notesByList);

  // todo: traer listas filtradas por el id
  const { title, slugTitleValue, chosenEmoji, description } = list;
  const [addCard, setAddCard] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const { entries } = useContext(EntriesContext);
  const entryBySlug = useMemo(
    () => entries.filter(({ list }) => list === title),
    [entries]
  );

  return (
    <>
      <Header />
      <ContainerDashBoard>
        <div className="w-full mt-10">
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <div className="flex items-center gap-2 mt-5">
                <div className="text-5xl">{chosenEmoji}</div>
                <h2 className="text-5xl font-semibold">{title}</h2>
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex justify-end gap-5">
                <button className="" onClick={() => setAddCard(!addCard)}>
                  <ContainerBtnAdd>
                    <IconAddCard color="white" />
                    Add Card
                  </ContainerBtnAdd>
                </button>
                <button className="" onClick={() => setAddNote(!addNote)}>
                  <ContainerBtnAdd>
                    <IconAddCard color="white" />
                    Add Note
                  </ContainerBtnAdd>
                </button>
              </div>
            </div>
          </div>
          {description && (
            <div
              className="max-h-72 mt-5 text-lg pb-5 text-gray-800 content max-w-full pr-5"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}
        </div>
        {addCard && <AddCard currentList={slugTitleValue} />}
        {addNote && <AddNote currentList={slugTitleValue} />}
        {entryBySlug.length > 0 && (
          <div className="flex gap-5">
            <SingleCardQuizNote
              entries={entries}
              listSlug={slugTitleValue}
              list={title}
            />
            <SingleCardQuiz entrySlug={slugTitleValue} entries={entries} />
            <SingleCardQuizWithDesc
              entrySlug={slugTitleValue}
              entries={entries}
            />
            <SingleCardQuizES entrySlug={slugTitleValue} entries={entries} />
          </div>
        )}
        {notesByList.length > 0 && (
          <div className="grid grid-cols-12 gap-5 mt-8 w-full">
            {notesByList.map((entry) => (
              <div key={entry._id} className="col-span-4">
                <SingleNote note={entry} currentList={title} />
              </div>
            ))}
          </div>
        )}

        {entryBySlug.length > 0 && (
          <div className="grid grid-cols-12 gap-5 mt-8 w-full">
            {entryBySlug.map((entry) => (
              <div key={entry._id} className="col-span-4">
                <SingleCard entry={entry} />
              </div>
            ))}
          </div>
        )}
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

  const notesByList = await dbNotes.getNotesByList(list?.title);
  console.log("notesByList", notesByList);

  return {
    props: {
      list,
      notesByList,
    },
  };
};