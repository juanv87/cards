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

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unSubscribe();
  }, []);

  return (
    <authContext.Provider value={{ signUp, logIn, user, logOut }}>
      {children}
    </authContext.Provider>
  );
}
