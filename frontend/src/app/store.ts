import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appState from "./_state/appStateSlice";
import graphReducers from "@editor/graphs/_state";
import pieceReducers from "@editor/pieces/_state";
import formulaReducers from "@editor/formulas/_state";
import liveScreenReducer from "./live/_state/liveScreenSlice";

export const store = configureStore({
  reducer: {
    ...graphReducers,
    ...pieceReducers,
    ...formulaReducers,
    live: liveScreenReducer,
    appState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
