import { configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./slices/cards";
import { listsSlice } from "./slices/lists";
import { authSlice } from "./auth/";

export const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
    lists: listsSlice.reducer,
    auth: authSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
