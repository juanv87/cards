import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { isValidObjectId } from "mongoose";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState, FC, useEffect } from "react";
import AddCard from "../../components/cards/AddCard";
import { useAuth } from "../../components/hooks/useAuth";
import useGetDataUser from "../../components/hooks/useGetDataUser";
import IconTag from "../../components/icons/IconTag";
import { ContainerDashBoard } from "../../components/layouts/ContainerDashBoard";
import { Header } from "../../components/layouts/Header";
import AddList from "../../components/lists/AddList";
import ListsList from "../../components/lists/ListsList";
import SingleList from "../../components/lists/SingleList";
import { dbEntries } from "../../database";
import { Entry, EntryStatus } from "../../interfaces/entry";
import { db } from "../../lib/firebase/firebase";

import { changeTitle, addProperty } from "../../store/slices/counter";
import { getCardsLists } from "../../store/slices/lists";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface Props {
  entry: Entry;
}
interface UserProps {}

const UserNickName: FC<Props> = ({ name }: any) => {
  const { dataUser, loadingUser } = useGetDataUser(name);
  // const { counter } = useSelector((state) => state.counter);
  // const { cardPrueba } = useSelector((state) => state.card);

  // console.log("Card prueba", cardPrueba);

  const { lists = [], isLoading } = useAppSelector((state) => state.lists);

  const dispatch = useAppDispatch();

  // const [titleValue, setTitleValue] = useState("");
  // const onChangeTitule = () => {
  //   dispatch(addProperty(titleValue));
  // };

  useEffect(() => {
    dispatch(getCardsLists(name));
  }, []);

  return (
    <>
      <Header />
      <ContainerDashBoard>
        {loadingUser ? "Cargando..." : "Hola, " + dataUser.name}
        {/* <input
          onChange={(e) => setTitleValue(e.target.value)}
          type="text"
          name="title"
          id=""
        /> */}
        {/* <button onClick={onChangeTitule}>Cambiar titulo</button> */}
        <AddCard />
        <AddList />
        {/* <button onClick={() => {}}>{counter}</button> */}
        {isLoading && "Cargando..."}
        <ListsList lists={lists} />
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

export default UserNickName;
