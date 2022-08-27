import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirebaseDB } from "../../lib/firebase/firebase";
import { useAuth } from "./useAuth";

const useGetLists = (userName: string) => {
  const { user } = useAuth();
  const [lists, setLists] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const getLists = async () => {
    if (user) {
      setLoadingLists(true);
      const colRef = collection(FirebaseDB, "usuarios", userName, "lists");
      const data = await getDocs(colRef);
      setLists(user && data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoadingLists(false);
    }
  };
  useEffect(() => {
    getLists();
  }, [user]);
  return { lists, loadingLists };
};

export default useGetLists;
