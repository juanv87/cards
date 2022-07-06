import React, { ChangeEvent, useState } from "react";
import { ContainerDashBoard } from "../../components/layouts/ContainerDashBoard";
import { Header } from "../../components/layouts/Header";
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
              {words.length > 0 &&
                words.map(({ word, meanings }) => (
                  <li key={word}>
                    <ul>
                      <li>
                        {meanings.map(({ definitions }) => {
                          return definitions.map(({ definition, example }) => (
                            <div key={definition} className="definition">
                              <p>{definition}</p>
                              <p>{example}</p>
                            </div>
                          ));
                        })}
                      </li>
                    </ul>
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
