import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase/firebase";
import { useAuth } from "./useAuth";

const useGetDataUser = (name: string) => {
  const [dataUser, setDataUser] = useState({} as any);
  const [loadingUser, setLoadingUser] = useState(true);
  const getDataUser = async () => {
    const colRef = collection(db, "usuarios");
    const result = await getDoc(doc(colRef, name));
    setDataUser(result.data());
    setLoadingUser(false);
  };
  useEffect(() => {
    getDataUser();
  }, []);
  return { dataUser, loadingUser };
};

export default useGetDataUser;
