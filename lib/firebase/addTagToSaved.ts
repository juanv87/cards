import firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { config } from "./firebase";

const db = getFirestore();

// https://www.youtube.com/watch?v=ig91zc-ERSE&ab_channel=Logicism

interface Props {
  slug: string;
  nombre: string;
}

export const addTagToSaved = ({ slug, nombre }: Props) => {
  const userId = firebase.auth().currentUser?.uid;
  return firebase.db
    .collection("usuarios")
    .doc(userId)
    .collection("tags-guardados")
    .doc(slug)
    .set({
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      userId: userId,
      slug,
      nombre,
    });
};
