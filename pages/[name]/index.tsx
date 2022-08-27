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
import { FirebaseDB } from "../../lib/firebase/firebase";

import { getCardsLists } from "../../store/slices/lists";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface Props {
  name: string;
  entry: Entry;
}

const UserNickName: FC<Props> = ({ name }) => {
  const { dataUser, loadingUser } = useGetDataUser(name);
  const { lists = [], isLoading } = useAppSelector((state) => state.lists);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCardsLists(name));
  }, []);

  return (
    <>
      <Header />
      <ContainerDashBoard>
        {loadingUser ? "Cargando..." : "Hola, " + dataUser.name}
        <AddCard />
        <AddList />
        {isLoading && "Cargando..."}
        <ListsList lists={lists} />
      </ContainerDashBoard>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { name } = params as { name: string };
  return {
    props: {
      name,
    },
  };
};

export default UserNickName;
