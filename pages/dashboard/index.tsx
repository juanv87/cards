import React, { ChangeEvent, useContext, useState } from "react";
import AddCard from "../../components/cards/AddCard";
import CardsList from "../../components/cards/CardsList";
import { ContainerDashBoard } from "../../components/layouts/ContainerDashBoard";
import { Header } from "../../components/layouts/Header";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

const DashBoard = () => {
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  return (
    <>
      <Header />
      <ContainerDashBoard>
        <div className="flex">
          <div className="flex flex-col mr-5 w-80">
            <AddCard setIsAddingEntry={setIsAddingEntry} />
            {/* {isAddingEntry ? (
              <AddCard setIsAddingEntry={setIsAddingEntry} />
            ) : (
              <div className="">
                <button onClick={() => setIsAddingEntry(true)}>Add card</button>
              </div>
            )} */}
          </div>
          <CardsList status="finished" />
        </div>
      </ContainerDashBoard>
    </>
  );
};

export default DashBoard;
