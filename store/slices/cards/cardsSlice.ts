import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CardsState {
  page: number;
  cards: any[];
  loading: boolean;
}

const initialState: CardsState = {
  page: 0,
  cards: [],
  loading: false,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    startLoadingCards: (state, action) => {
      state.loading = true;
    },
    setCards: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.cards = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoadingCards, setCards } = cardsSlice.actions;
