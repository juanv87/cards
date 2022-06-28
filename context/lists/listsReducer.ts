import { List } from "../../interfaces";
import { ListsState } from ".";

type ListsActionType =
  | { type: "[List] Add-List"; payload: List }
  | { type: "[List] List-Updated"; payload: List }
  | { type: "[List] Refresh-Data"; payload: List[] };

export const listsReducer = (
  state: ListsState,
  action: ListsActionType
): ListsState => {
  switch (action.type) {
    case "[List] Add-List":
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    case "[List] List-Updated":
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list._id === action.payload._id) {
            list.status = action.payload.status;
            list.description = action.payload.description;
          }
          return list;
        }),
      };
    case "[List] Refresh-Data": {
      return {
        ...state,
        lists: [...action.payload],
      };
    }

    default:
      return state;
  }
};
