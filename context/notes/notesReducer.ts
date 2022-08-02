import { Note } from "../../interfaces";
import { NotesState } from ".";

type NotesActionType =
  | { type: "[Note] Add-Note"; payload: Note }
  | { type: "[Note] Note-Updated"; payload: Note }
  | { type: "[Note] Refresh-Data"; payload: Note[] };

export const notesReducer = (
  state: NotesState,
  action: NotesActionType
): NotesState => {
  switch (action.type) {
    case "[Note] Add-Note":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "[Note] Note-Updated":
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            //note.status = action.payload.status;
            note.description = action.payload.description;
          }
          return note;
        }),
      };
    case "[Note] Refresh-Data": {
      return {
        ...state,
        notes: [...action.payload],
      };
    }

    default:
      return state;
  }
};
