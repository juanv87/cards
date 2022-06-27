// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyART_XjwdfA_qe6J6Rmm5KJ2IY-C1-yzZA",
  authDomain: "cards-20612.firebaseapp.com",
  projectId: "cards-20612",
  storageBucket: "cards-20612.appspot.com",
  messagingSenderId: "333639978573",
  appId: "1:333639978573:web:daf5373def34351eef1604",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
