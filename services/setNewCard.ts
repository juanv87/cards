import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { List } from "../interfaces";
import { db } from "../lib/firebase/firebase";

interface Props {
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

const setNewCard = async ({
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
};
export default setNewCard;
