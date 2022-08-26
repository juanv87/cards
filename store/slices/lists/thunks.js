import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase/firebase";
import { setLists, startLoadingLists } from "./listsSlice";

export const getCardsLists = (name) => {
  return async (dispatch) => {
    dispatch(startLoadingLists());
    const colRef = collection(db, "usuarios", name, "lists");
    const result = await getDocs(colRef);
    const lists = result.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } || {})
    );
    console.log("Result", lists);
    dispatch(setLists(lists));
  };
};
