import React, { useContext, useState } from "react";
import AddCard from "../../../components/cards/AddCard";
import CardsList from "../../../components/cards/CardsList";
import { ContainerDashBoard } from "../../../components/layouts/ContainerDashBoard";
import { Header } from "../../../components/layouts/Header";
import { EntriesContext } from "../../../context/entries";
import { UIContext } from "../../../context/ui";
import IconAddCard from "../../../components/icons/IconAddCard";
import IconClose from "../../../components/icons/IconClose";
import AddNote from "../../../components/notes/AddNote";

const Cards = () => {
  const [addCard, setAddCard] = useState(false);
  return (
    <>
      <Header />
      <ContainerDashBoard>
        <button className="" onClick={() => setAddCard(!addCard)}>
          <div className="flex items-center gap-2 rounded-full bg-green-600 p-3 shadow-md fixed z-50 right-20 bottom-20">
            <IconAddCard color="white" />
          </div>
        </button>
        {addCard && <AddCard />}
        <CardsList status="publish" />
      </ContainerDashBoard>
    </>
  );
};

export default Cards;
