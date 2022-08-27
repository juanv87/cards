import React, { useState, useEffect } from "react";
import IconAddCard from "../../../components/icons/IconAddCard";
import { ContainerDashBoard } from "../../../components/layouts/ContainerDashBoard";
import { Header } from "../../../components/layouts/Header";
import AddList from "../../../components/lists/AddList";
import ListsList from "../../../components/lists/ListsList";
import { GetServerSideProps } from "next";
import { collection, getDocs } from "firebase/firestore";
import { Entry, List } from "../../../interfaces";
import { FirebaseDB } from "../../../lib/firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getCardsLists } from "../../../store/slices/lists";

interface Props {
  lists: List[];
}

const Lists = ({ name }: any) => {
  const [addList, setAddList] = useState(false);
  const { lists = [], isLoading } = useAppSelector((state) => state.lists);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCardsLists(name));
  }, []);
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
        {isLoading && "Cargando..."}
        <div className="flex">
          <ListsList lists={lists} />
        </div>
      </ContainerDashBoard>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { name } = params as { name: string };

  // const colRef = collection(db, "usuarios", name, "lists");
  // const result = await getDocs(colRef);

  // const lists = result.docs.map(
  //   (doc) => ({ ...doc.data(), id: doc.id } as Entry)
  // );

  return {
    props: {
      name,
    },
  };
};

export default Lists;
