import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import nav from "@navBar/MainNavSlice";
import recordReducers from "@editor/record/state";
import targetReducers from "@editor/target/state";

export const store = configureStore({
  reducer: {
    ...recordReducers,
    ...targetReducers,
    nav,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
