import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

export type ScreenType = "live" | "record" | "target" | "piece" | "formula";

interface MainNavType {
  currentScreen: ScreenType;
}

const initialState: MainNavType = {
  currentScreen: "formula",
};

export const mainNavSlice = createSlice({
  name: "liveValues",
  initialState,
  reducers: {
    setCurrentScreen: (state, action: PayloadAction<ScreenType>) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { setCurrentScreen } = mainNavSlice.actions;

export const selectCurrentScreen = (state: RootState) => state.nav.currentScreen;

export default mainNavSlice.reducer;
