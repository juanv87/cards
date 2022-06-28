import React, { ChangeEvent, useContext, useState } from "react";
import AddCard from "../../components/cards/AddCard";
import CardsList from "../../components/cards/CardsList";
import { ContainerDashBoard } from "../../components/layouts/ContainerDashBoard";
import { Header } from "../../components/layouts/Header";
import AddList from "../../components/lists/AddList";
import ListsList from "../../components/lists/ListsList";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

const DashBoard = () => {

  return (
    <>
      <Header />
      <ContainerDashBoard>
        <div className="flex">
          <div className="flex flex-col mr-5 w-80">
            <AddCard />
            <AddList />
          </div>
          <CardsList status="finished" />
          <ListsList status="finished" />
        </div>
      </ContainerDashBoard>
    </>
  );
};

export default DashBoard;
