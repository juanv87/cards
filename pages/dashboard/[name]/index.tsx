import {   collection,
  doc,
  getDoc,
  getDocs,
  query,
  where, } from "firebase/firestore";
import { isValidObjectId } from "mongoose";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState, FC } from "react";
import AddCard from "../../../components/cards/AddCard";
import IconTag from "../../../components/icons/IconTag";
import { ContainerDashBoard } from "../../../components/layouts/ContainerDashBoard";
import { Header } from "../../../components/layouts/Header";
import SingleList from "../../../components/lists/SingleList";
import { dbEntries } from "../../../database";
import { Entry, EntryStatus } from "../../../interfaces/entry";
import { db } from "../../../lib/firebase/firebase";

interface Props {
  entry: Entry;
}
interface UserProps {

}

const UserNickName: FC<Props> = ({lists}: any) => {
  console.log("Lists", lists);
  
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<EntryStatus>("pending");
  const [touched, setTouched] = useState(false);
  return (
    <>
      <Header />
      <ContainerDashBoard>
        <AddCard />
      {lists.length > 0
          ? lists?.map((entry: any) => (
              <div key={entry.id} className="col-span-4 mt-8">
                <SingleList list={entry} />
              </div>
            )) : "No hay listas"}
      </ContainerDashBoard>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { name } = params as { name: string };

  console.log("params", name)

  const colRef = collection(db, "usuarios", name, 'lists');
  const result = await getDocs(colRef);
  console.log("result", result)

  const lists = result.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Entry));

  // if (!entry) {
  //   return {
  //     redirect: {
  //       destination: "/dashboard/cards",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      // dataUser
      lists
    },
  };
};

export default UserNickName;
