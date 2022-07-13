import { FC, useEffect, useReducer } from "react";

import { v4 as uuidv4 } from "uuid";

import { Entry, EntryStatus } from "../../interfaces";

import { entriesApi } from "../../api";

import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: any = ({ children }: any) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const addNewEntry = async (
    title: string,
    description: string,
    status: string,
    meaning: string,
    phrase: string,
    list: string,
    fav: boolean,
    languaje: string,
    slugTitleValue: string,
    imagen: string,
    memoCount: number
  ) => {
    // El 2do argumento de una peticion POST es la data que queremos mandar.
    const { data } = await entriesApi.post<Entry>("/entries", {
      title,
      description,
      status,
      meaning,
      phrase,
      list,
      fav,
      languaje,
      slugTitleValue,
      imagen,
      memoCount,
    });
    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async ({
    _id,
    title,
    description,
    status,
    meaning,
    phrase,
    list,
    fav,
    languaje,
    imagen,
    memoCount,
  }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        _id,
        title,
        description,
        status,
        meaning,
        phrase,
        list,
        fav,
        languaje,
        imagen,
        memoCount,
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  // todo: crear endpoint para traer cards por listas.

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
