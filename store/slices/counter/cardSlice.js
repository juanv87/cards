import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    cardPrueba: {
      id: 243432,
      title: "Prueba",
      description: "Prueba desc",
      status: "active",
      createdAt: 3242352,
      meaning: "dfsafsdfsdgfs",
      phrase: "fsedsdgsdgsdgds",
      list: "lista",
      fav: false,
      slugTitleValue: "fdsgfsdgds",
    },
  },
  reducers: {
    // Change title of card
    changeTitle: (state, action) => {
      state.cardPrueba.title = action.payload;
    },
    // Add property to card
    addProperty: (state, action) => {
      state.cardPrueba[action.payload] = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTitle, addProperty } = cardSlice.actions;
