import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { List } from "../interfaces";
import { db } from "../lib/firebase/firebase";

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
}: Props) => {
  if (idList !== listValue) {
    const colRef = collection(
      db,
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
        db,
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
  } else {
    console.log(
      "idList",
      idList,
      "listValue",
      listValue,
      "titleValue",
      titleValue,
      "idCard",
      idCard
    );
    const colRef = collection(
      db,
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
        db,
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
  //     db,
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
