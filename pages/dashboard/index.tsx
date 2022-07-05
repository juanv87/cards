import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import AddCard from "../../components/cards/AddCard";
import CardsList from "../../components/cards/CardsList";
import { ContainerDashBoard } from "../../components/layouts/ContainerDashBoard";
import { Header } from "../../components/layouts/Header";
import AddList from "../../components/lists/AddList";
import ListsList from "../../components/lists/ListsList";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { getWords } from "../../services/words";

const DashBoard = () => {
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
          <div className="flex flex-col h-full ">
            <h2>Buscar palabra</h2>
            <input type="text" onChange={onMeaningFieldChanges} />
            <button onClick={onSendWord}>Select</button>
            <ul>
              {words &&
                words.map((item) => (
                  <li key={item.word}>
                    {item.meanings[0].definitions[0].definition} <br />
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
