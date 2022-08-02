/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useState, useEffect, useContext } from "react";
import { Router, useRouter } from "next/router";
import { ContainerDashBoard } from "../../components/layouts/ContainerDashBoard";
import { Header } from "../../components/layouts/Header";
import { getWords } from "../../services/words";
import { suggestCards } from "../../database/suggest-cards";
import SingleCard from "../../components/cards/SingleCard";
import { db } from "../../lib/firebase/firebase";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useAuth } from "../../components/hooks/useAuth";
import { authContext } from "../../context/authContext";

const DashBoard = () => {
  const { user } = useContext(authContext);

  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "usuarios");

  const emailUser = user && user.email;
  console.log("index dashboard", emailUser);

  // const getUsers = async () => {
  //   const data = await getDocs(usersCollectionRef);
  //   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };

  const onSetPrueba = async () => {
    await addDoc(collection(db, "usuarios", "juanv87@gmail.com", "cards"), {
      title: "",
      description: "",
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
                return <SingleCard key={entry.id} entry={entry} />;
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
