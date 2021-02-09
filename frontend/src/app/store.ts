import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import nav from "@navBar/MainNavSlice";
import recordReducers from "@editor/record/_state";
import targetReducers from "@editor/target/_state";
import editorState from "@editor/_state/editorSlice";

export const store = configureStore({
  reducer: {
    ...recordReducers,
    ...targetReducers,
    editorState,
    nav,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
