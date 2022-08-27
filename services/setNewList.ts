import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { List } from "../interfaces";
import { FirebaseDB } from "../lib/firebase/firebase";

interface Props {
  titleValue: string;
  userId: string;
  descValue: string;
  chosenEmoji: string;
  pinnedValue: boolean;
}

const setNewList = async ({
  titleValue,
  userId,
  descValue,
  chosenEmoji,
  pinnedValue,
}: Props) => {
  await setDoc(
    doc(
      FirebaseDB,
      "usuarios",
      userId,
      "lists",
      titleValue
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
    ),
    {
      title: titleValue,
      description: descValue,
      titleSlug: titleValue
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      chosenEmoji,
      pinnedValue,
      userId,
    }
  );
  await addDoc(
    collection(
      FirebaseDB,
      "usuarios",
      userId,
      "lists",
      titleValue
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      "cards"
    ),
    {
      title: "Titulo de la tarjeta",
      description: "Significado en inglés",
      meaning: "Significado en español",
      phrase: "Ejemplos de uso en contexto",
      list: titleValue
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      fav: "",
      languaje: "",
      slugTitleValue: "",
      imagen: "",
      memoCount: "",
      userId,
    }
  );
};
export default setNewList;
