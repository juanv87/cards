import { FC, useEffect, useReducer } from "react";

import { v4 as uuidv4 } from "uuid";

import { Entry, ListStatus, List } from "../../interfaces";

import { listsApi } from "../../api";

import { ListsContext, listsReducer } from "./";

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
    chosenEmoji: string
  ) => {
    // El 2do argumento de una peticion POST es la data que queremos mandar.
    const { data } = await listsApi.post<List>("/lists", {
      title,
      description,
      status,
      slugTitleValue,
      chosenEmoji,
    });
    dispatch({ type: "[List] Add-List", payload: data });
  };

  const updateList = async ({
    _id,
    title,
    description,
    status,
    slugTitleValue,
    chosenEmoji,
  }: List) => {
    try {
      const { data } = await listsApi.put<List>(`/lists/${_id}`, {
        _id,
        title,
        description,
        status,
        slugTitleValue,
        chosenEmoji,
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
