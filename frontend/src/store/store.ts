import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import recordDataReducer from "@editor/record/state/recordDataSlice";
import recordDisplayReducer from "@editor/record/state/recordDisplaySlice";
import mainNavReducer from "@navBar/MainNavSlice";

export const store = configureStore({
  reducer: {
    recordData: recordDataReducer,
    recordDisplay: recordDisplayReducer,
    nav: mainNavReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
