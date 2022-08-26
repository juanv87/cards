import { configureStore } from "@reduxjs/toolkit";
import { counterSlice, cardSlice } from "./slices/counter";
import { cardsSlice } from "./slices/cards";
import { listsSlice } from "./slices/lists";
// import { pokemonSlice } from "./slices/pokemons";
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    card: cardSlice.reducer,
    cards: cardsSlice.reducer,
    lists: listsSlice.reducer,
    // pokemons: pokemonSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
