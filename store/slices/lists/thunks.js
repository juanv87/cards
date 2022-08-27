import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../../lib/firebase/firebase";
import { setCards, startLoadingCards } from "../cards";
import { setLists, startLoadingLists } from "./listsSlice";

export const getCardsLists = (name) => {
  return async (dispatch) => {
    dispatch(startLoadingLists());
    const colRef = collection(FirebaseDB, "usuarios", name, "lists");
    const result = await getDocs(colRef);
    const lists = result.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } || {})
    );
    dispatch(setLists(lists));
  };
};

export const getCardsByList = (name, id) => {
  return async (dispatch) => {
    dispatch(startLoadingCards());
    const colRef = collection(
      FirebaseDB,
      "usuarios",
      name,
      "lists",
      id,
      "cards"
    );
    const result = await getDocs(colRef);
    const cards = result.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } || {})
    );
    dispatch(setCards(cards));
  };
};

export const saveCard = ({
  titleValue,
  userId,
  descValue,
  listValue,
  meaningValue,
  phraseValue,
  favValue,
  languajeValue,
  imagenValue,
}) => {
  return async (dispatch) => {
    console.log("saveCard", titleValue);
    await setDoc(
      doc(
        FirebaseDB,
        "usuarios",
        userId,
        "lists",
        listValue
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
        "cards",
        titleValue
      ),
      {
        title: titleValue,
        description: descValue,
        meaning: meaningValue,
        phrase: phraseValue,
        list: listValue,
        fav: favValue,
        languaje: languajeValue,
        slugTitleValue: titleValue
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
        imagen: imagenValue,
        memoCount: 0,
        userId: userId,
      }
    );
  };
};
