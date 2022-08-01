import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../lib/firebase/firebase";
import { doc, documentId, setDoc } from "firebase/firestore";
export const authContext = createContext(null as any);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null as any);
  const [loadingUser, setLoadingUser] = useState(false);

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    setLoadingUser(true);
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoadingUser(false);
      } else {
        setUser(null);
        setLoadingUser(false);
      }
    });
    return () => unSubscribe();
  }, []);

  return (
    <authContext.Provider value={{ signUp, logIn, user, logOut, loadingUser }}>
      {children}
    </authContext.Provider>
  );
}
