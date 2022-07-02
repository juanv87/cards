import { FC, useEffect, useReducer } from "react";

import { v4 as uuidv4 } from "uuid";

import { Entry, ListStatus, List, Note } from "../../interfaces";

import { notesApi } from "../../api";

import { NotesContext, notesReducer } from ".";

export interface NotesState {
  notes: Note[];
}

const Notes_INITIAL_STATE: NotesState = {
  notes: [],
};

export const NotesProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(notesReducer, Notes_INITIAL_STATE);
  const addNewNote = async (
    title: string,
    description: string,
    content: string
  ) => {
    // El 2do argumento de una peticion POST es la data que queremos mandar.
    const { data } = await notesApi.post<Note>("/notes", {
      title,
      description,
      content,
    });
    dispatch({ type: "[Note] Add-Note", payload: data });
  };

  const updateNote = async ({ _id, title, description, content }: Note) => {
    try {
      const { data } = await notesApi.put<Note>(`/notes/${_id}`, {
        _id,
        title,
        description,
        content,
      });
      dispatch({ type: "[Note] Note-Updated", payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshNotes = async () => {
    const { data } = await notesApi.get<Note[]>("/notes");
    dispatch({ type: "[Note] Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        ...state,
        addNewNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
