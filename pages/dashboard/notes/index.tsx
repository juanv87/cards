import React, { useContext, useState } from "react";
import IconAddCard from "../../../components/icons/IconAddCard";
import IconClose from "../../../components/icons/IconClose";
import { ContainerDashBoard } from "../../../components/layouts/ContainerDashBoard";
import { Header } from "../../../components/layouts/Header";
import AddList from "../../../components/notes/AddNote";
import NotesList from "../../../components/notes/NotesList";
import { UIContext } from "../../../context/ui";

const Notes = () => {
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [addList, setAddList] = useState(false);
  return (
    <>
      <Header />
      <ContainerDashBoard>
        <button className="mt-5" onClick={() => setAddList(!addList)}>
          <div className="flex items-center gap-2">
            <IconAddCard />
            <div className="text-2xl"> Add list here</div>
          </div>
        </button>
        {addList && <AddList />}
        <div className="flex">{/* <NotesList /> */}</div>
      </ContainerDashBoard>
    </>
  );
};

export default Notes;
