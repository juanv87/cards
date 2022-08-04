import { createContext } from "react";
import { List } from "../../interfaces";

interface ContextProps {
  lists: List[];
  updateList: (list: List) => void;
  addNewList: (list: List) => void;
  probando: Function;
}

export const ListsContext = createContext({} as ContextProps);
