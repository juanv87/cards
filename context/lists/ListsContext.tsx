import { createContext } from "react";
import { List } from "../../interfaces";

interface ContextProps {
  lists: List[];
  addNewList: (
    title: string,
    description: string,
    status: string,
    slugTitleValue: string,
    chosenEmoji: string
  ) => void;
  updateList: (list: List) => void;
}

export const ListsContext = createContext({} as ContextProps);
