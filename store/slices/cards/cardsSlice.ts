import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CardsState {
  cards: any[];
  isLoading: boolean;
}

const initialState: CardsState = {
  cards: [],
  isLoading: false,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    startLoadingCards: (state, action) => {
      state.isLoading = true;
    },
    setCards: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.cards = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingCards, setCards } = cardsSlice.actions;
