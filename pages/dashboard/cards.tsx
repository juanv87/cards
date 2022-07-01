import React, { useContext, useState } from "react";
import AddCard from "../../components/cards/AddCard";
import CardsList from "../../components/cards/CardsList";
import { ContainerDashBoard } from "../../components/layouts/ContainerDashBoard";
import { Header } from "../../components/layouts/Header";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import IconAddCard from "../../components/icons/IconAddCard";
import IconClose from "../../components/icons/IconClose";

const Cards = () => {
  const [addCard, setAddCard] = useState(false);
  return (
    <>
      <Header />
      <ContainerDashBoard>
        <button className="mt-5" onClick={() => setAddCard(!addCard)}>
          <div className="flex items-center gap-2">
            <IconAddCard />
            <div className="text-2xl"> Add card here</div>
          </div>
        </button>
        {addCard && <AddCard />}
        <CardsList status="publish" />
      </ContainerDashBoard>
    </>
  );
};

export default Cards;
