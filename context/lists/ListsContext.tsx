import { createContext } from "react";
import { List } from "../../interfaces";

interface ContextProps {
  lists: List[];
  addNewList: (
    title: string,
    status: string,
    description: string
  ) => void;
  updateList: (list: List) => void;
}

export const ListsContext = createContext({} as ContextProps);
