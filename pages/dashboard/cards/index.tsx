import React, { useState } from "react";
import AddCard from "../../../components/cards/AddCard";
import CardsList from "../../../components/cards/CardsList";
import { ContainerDashBoard } from "../../../components/layouts/ContainerDashBoard";
import { Header } from "../../../components/layouts/Header";
import IconAddCard from "../../../components/icons/IconAddCard";
import { ContainerBtnAdd } from "../../../components/layouts/ContainerBtnAdd";
import AddNote from "../../../components/notes/AddNote";

const Cards = () => {
  const [addCard, setAddCard] = useState(false);
  const [addNote, setAddNote] = useState(false);
  return (
    <>
      <Header />
      <ContainerDashBoard>
        <div className="flex justify-end gap-5 mt-5">
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
        {addCard && <AddCard />}
        {addNote && <AddNote />}
        <CardsList status="publish" />
      </ContainerDashBoard>
    </>
  );
};

export default Cards;
