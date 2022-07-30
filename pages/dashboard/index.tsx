/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import { ContainerDashBoard } from "../../components/layouts/ContainerDashBoard";
import { Header } from "../../components/layouts/Header";
import { getWords } from "../../services/words";
import { suggestCards } from "../../database/suggest-cards";
import SingleCard from "../../components/cards/SingleCard";
import { db } from "../../lib/firebase/firebase";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useAuth } from "../../components/hooks/useAuth";

const DashBoard = () => {
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "usuarios");

  const { user } = useAuth();
  console.log(user);

  // const getUsers = async () => {
  //   const data = await getDocs(usersCollectionRef);
  //   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    // getUsers();
  }, []);

  const onSetPrueba = async () => {
    await setDoc(doc(db, "usuarios", user.email, "cards", "Card title"), {
      title: "",
      description: "",
      meaning: "",
      phrase: "",
      createdAt: "",
      list: "",
      fav: "",
      languaje: "",
      titleValue: "",
      imagen: "",
      memoCount: "",
      user: "",
    });
  };

  const [words, setWords] = useState([]);
  const [selectWord, setSelectWord] = useState("");
  const onMeaningFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectWord(event.target.value);
  };
  const onSendWord = () => {
    getWords(selectWord).then((data) => {
      setWords(data);
    });
  };

  return (
    <>
      <Header />
      <ContainerDashBoard>
        <div className="flex justify-center h-full">
          <button onClick={onSetPrueba}>PROEBANDOO</button>
          <div className="flex flex-col h-full ">
            {/* {users.map((user) => {
              return <li key={user.id}>{user.email}</li>;
            })} */}
            <h2>Buscar palabra</h2>
            <input type="text" onChange={onMeaningFieldChanges} />
            <button onClick={onSendWord}>Select</button>
            <ul>
              {suggestCards.cards.map((entry) => {
                return <SingleCard key={entry._id} entry={entry} />;
              })}
            </ul>
            <ul>
              {words.length > 0 &&
                words.map(({ word, meanings }: any) => (
                  <li key={word}>
                    {meanings.map(({ definitions }: any) => {
                      return definitions.map(({ definition, example }: any) => (
                        <div key={definition} className="definition mb-5">
                          <p>
                            <strong>Definition:</strong> {definition}
                          </p>
                          <p>
                            <strong>Example:</strong> {example}
                          </p>
                        </div>
                      ));
                    })}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </ContainerDashBoard>
    </>
  );
};

export default DashBoard;
