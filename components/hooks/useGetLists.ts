import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase/firebase";
import { useAuth } from "./useAuth";

const useGetLists = () => {
  const { user } = useAuth();
  const emailUser = user && user.email;
  const [lists, setLists] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const getLists = async () => {
    if (user) {
      setLoadingLists(true);
      const colRef = collection(db, "usuarios", emailUser, "lists");
      const data = await getDocs(colRef);
      setLists(user && data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoadingLists(false);
    }
  };
  useEffect(() => {
    getLists();
    console.log("useGetLists", lists);
  }, [user]);
  return { lists, loadingLists };
};

export default useGetLists;
