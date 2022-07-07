import React, { useState } from "react";
import IconAddCard from "../../../components/icons/IconAddCard";
import { ContainerDashBoard } from "../../../components/layouts/ContainerDashBoard";
import { Header } from "../../../components/layouts/Header";
import AddList from "../../../components/lists/AddList";
import ListsList from "../../../components/lists/ListsList";

const Lists = () => {
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
        <div className="flex">
          <ListsList status="publish" />
        </div>
      </ContainerDashBoard>
    </>
  );
};

export default Lists;
