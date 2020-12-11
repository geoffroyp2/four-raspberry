import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@src/redux/store";

type displayStateType = {
  currentTab: 0 | 1 | 2 | 3 | 4;
};

const initialState: displayStateType = {
  currentTab: 1,
};

const RGraphSlice = createSlice({
  name: "displayState",
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<displayStateType["currentTab"]>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = RGraphSlice.actions;

// export const CurrentTab = (state: RootState) =>

export default RGraphSlice.reducer;
