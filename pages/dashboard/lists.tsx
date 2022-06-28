import React, { useContext } from "react";
import { ContainerDashBoard } from "../../components/layouts/ContainerDashBoard";
import { Header } from "../../components/layouts/Header";
import AddList from "../../components/lists/AddList";
import ListsList from "../../components/lists/ListsList";
import { UIContext } from "../../context/ui";

const Lists = () => {
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  return (
    <>
      <Header />
      <ContainerDashBoard>
        <div className="flex">
          <div className="flex flex-col mr-5 w-80">
            <AddList />
          </div>
          <ListsList status="finished" />
        </div>
      </ContainerDashBoard>
    </>
  );
};

export default Lists;
