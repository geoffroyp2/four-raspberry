import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import recordData from "@editor/record/state/recordDataSlice";
import recordDisplay from "@editor/record/state/recordDisplaySlice";
import nav from "@navBar/MainNavSlice";
import recordState from "@editor/record/state/recordStateSlice";

export const store = configureStore({
  reducer: {
    recordData,
    recordDisplay,
    recordState,
    nav,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
