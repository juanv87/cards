import { createContext } from "react";
import { Note } from "../../interfaces";

interface ContextProps {
  notes: Note[];
  addNewNote: (title: string, description: string, content: string) => void;
  updateNote: (note: Note) => void;
}

export const NotesContext = createContext({} as ContextProps);
