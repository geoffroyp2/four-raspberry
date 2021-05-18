import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appState from "./_state/appStateSlice";

export const store = configureStore({
  reducer: {
    appState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
