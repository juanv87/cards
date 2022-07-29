import firebase from "firebase/app";
import "firebase/firestore";
import { config } from "./firebase";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const db = firebase.firestore();

export const addUser = () => {
  if (
    firebase.auth().currentUser?.metadata.creationTime ===
    firebase.auth().currentUser?.metadata.lastSignInTime
  ) {
    const userId = firebase.auth().currentUser?.uid;
    const userEmail = firebase.auth().currentUser?.email;
    const userName = firebase.auth().currentUser?.displayName;
    const userPhoto =
      "https://ui-avatars.com/api/?name=" +
      firebase.auth().currentUser?.displayName +
      "&size=80&background=f44336&color=fff";
    const creationTime = firebase.auth().currentUser?.metadata.creationTime;
    const lastSignInTime = firebase.auth().currentUser?.metadata.lastSignInTime;
    return (
      db
        .collection("usuarios")
        .doc(userId)
        .set({
          UserId: userId,
          Correo: userEmail,
          Nombre: userName,
          Foto: userPhoto,
          UserName: userEmail?.substring(0, userEmail.length - 10),
          UserNickname: userEmail?.substring(0, userEmail.length - 10),
          CreationTime: creationTime,
          LastSignInTime: lastSignInTime,
        }),
      db.collection("usuarios").doc(userId).collection("cards-created").add({}),
      db.collection("usuarios").doc(userId).collection("carpetas").add({})
    );
  } else {
    return null;
  }
};
