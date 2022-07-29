import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/authContext";
import { getWords } from "../../services/words";

export const useGetDefinitionsByWord = (selectWord: any) => {
  const [wordDefinition, setWord] = useState([]);
  const getDefinitions = async () => {
    getWords(selectWord).then((wordsData) => {
      setWord(wordsData);
    });
  };
  useEffect(() => {
    getDefinitions();
  }, []);
  return wordDefinition;
};
