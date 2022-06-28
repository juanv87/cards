import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
  entries: Entry[];
  addNewEntry: (
    title: string,
    meaning: string,
    phrase: string,
    status: string,
    description: string,
    type: string
  ) => void;
  updateEntry: (newEntry: Entry) => void;
}

export const EntriesContext = createContext({} as ContextProps);
