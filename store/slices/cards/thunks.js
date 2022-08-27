import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../../../lib/firebase/firebase";
import { setCards, startLoadingCards } from "./cardsSlice";

export const getCardsLists = (name) => {
  return async (dispatch) => {
    dispatch(startLoadingCards());
    const colRef = collection(db, "usuarios", name, "lists");
    const result = await getDocs(colRef);
    const lists = result.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } || {})
    );
    console.log("Result", lists);
    dispatch(setCards(lists));
  };
};
