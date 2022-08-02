import { useEffect, useReducer } from "react";
import { List } from "../../interfaces";
import { listsApi } from "../../api";
import { ListsContext, listsReducer } from "./";
import { collection } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";

export interface ListsState {
  lists: List[];
}

const Lists_INITIAL_STATE: ListsState = {
  lists: [],
};

export const ListsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(listsReducer, Lists_INITIAL_STATE);
  const addNewList = async (
    title: string,
    description: string,
    status: string,
    slugTitleValue: string,
    chosenEmoji: string,
    pinned: boolean
  ) => {
    // El 2do argumento de una peticion POST es la data que queremos mandar.
    const { data } = await listsApi.post<List>("/lists", {
      title,
      description,
      status,
      slugTitleValue,
      chosenEmoji,
      pinned,
    });
    dispatch({ type: "[List] Add-List", payload: data });
  };

  const updateList = async ({
    id,
    title,
    description,
    status,
    slugTitleValue,
    chosenEmoji,
    pinned,
  }: List) => {
    try {
      const { data } = await listsApi.put<List>(`/lists/${id}`, {
        id,
        title,
        description,
        status,
        slugTitleValue,
        chosenEmoji,
        pinned,
      });
      dispatch({ type: "[List] List-Updated", payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshLists = async () => {
    const { data } = await listsApi.get<List[]>("/lists");
    dispatch({ type: "[List] Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshLists();
  }, []);

  return (
    <ListsContext.Provider
      value={{
        ...state,
        addNewList,
        updateList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};
