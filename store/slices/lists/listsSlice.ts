import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListsState {
  lists: any[];
  isLoading: boolean;
}

const initialState: ListsState = {
  lists: [],
  isLoading: false,
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    startLoadingLists: (state, action) => {
      state.isLoading = true;
    },
    setLists: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.lists = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingLists, setLists } = listsSlice.actions;
