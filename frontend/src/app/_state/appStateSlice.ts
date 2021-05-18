import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store";

interface AppStateType {
  theme: "dark" | "light";
}

const initialState: AppStateType = {
  theme: "dark",
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppTheme: (state, action: PayloadAction<AppStateType["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

export const { setAppTheme } = appStateSlice.actions;

export const selectAppTheme = (state: RootState) => state.appState.theme;

export default appStateSlice.reducer;
