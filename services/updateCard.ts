import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { List } from "../interfaces";
import { FirebaseDB } from "../lib/firebase/firebase";

interface Props {
  idCard: string;
  idList: string;
  titleValue: string;
  userId: string;
  descValue: string;
  listValue: string;
  meaningValue: string;
  phraseValue: string;
  favValue?: boolean;
  languajeValue?: string;
  imagenValue?: string;
  setCardExists: (value: boolean) => void;
}

const updateCard = async ({
  idCard,
  idList,
  titleValue,
  userId,
  descValue,
  listValue,
  meaningValue,
  phraseValue,
  favValue,
  languajeValue,
  imagenValue,
  setCardExists,
}: Props) => {
  if (idList !== listValue) {
    const colRef = collection(
      FirebaseDB,
      "usuarios",
      userId,
      "lists",
      idList
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      "cards"
    );
    await deleteDoc(doc(colRef, titleValue));
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
    setCardExists(false);
  } else {
    const colRef = collection(
      FirebaseDB,
      "usuarios",
      userId,
      "lists",
      idList
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      "cards"
    );
    await deleteDoc(doc(colRef, idCard));
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
  }

  // if (idList !== listValue) {
  //   const colRef = collection(
  //     FirebaseDB,
  //     "usuarios",
  //     userId,
  //     "lists",
  //     idList
  //       .toLowerCase()
  //       .replace(/ /g, "-")
  //       .replace(/[^\w-]+/g, ""),
  //     "cards"
  //   );
  //   await deleteDoc(doc(colRef, titleValue));
  // }
};
export default updateCard;
