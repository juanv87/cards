import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/authContext";
import { getWords } from "../../services/words";

export const useGetDefinitionsByWord = (selectWord) => {
  const [wordDefinition, setWord] = useState([]);
  useEffect(() => {
    getWords(selectWord).then((wordsData) => {
      setWord(wordsData);
    });
  }, []);
  return wordDefinition;
};
