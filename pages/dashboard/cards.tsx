import React, { useContext } from "react";
import AddCard from "../../components/cards/AddCard";
import CardsList from "../../components/cards/CardsList";
import { ContainerDashBoard } from "../../components/layouts/ContainerDashBoard";
import { Header } from "../../components/layouts/Header";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

const Cards = () => {

  return (
    <>
      <Header />
      <ContainerDashBoard>
        <div className="flex">
          <div className="flex flex-col mr-5 w-80">
            <AddCard />
          </div>
          <CardsList status="finished" />
        </div>
      </ContainerDashBoard>
    </>
  );
};

export default Cards;
