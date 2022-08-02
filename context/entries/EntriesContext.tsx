import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
  entries: Entry[];
  addNewEntry: (
    title: string,
    meaning: string,
    phrase: string,
    description: string,
    status: string,
    list: string,
    fav: boolean,
    languaje: string,
    slugTitleValue: string,
    imagen: string,
    memoCount: number,
    user: string
  ) => void;
  updateEntry: (newEntry: Entry) => void;
  deleteEntry: (id: string) => void;
  deleteCard: (id: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);
