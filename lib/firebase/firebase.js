import "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const FIREBASE_APIKEY = process.env.NEXT_PUBLIC_FIREBASE_APIKEY;
const FIREBASE_AUTHDOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN;
const FIREBASE_PROJECTID = process.env.NEXT_PUBLIC_FIREBASE_PROJECTID;
const FIREBASE_STORAGEBUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET;
const FIREBASE_MESSAGINGSENDERID =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID;
const FIREBASE_APPID = process.env.NEXT_PUBLIC_FIREBASE_APPID;
const FIREBASE_MEASUREMENTID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID;

export const config = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
};

export const app = initializeApp(config);
export const auth = getAuth(app);

export default getFirestore();
