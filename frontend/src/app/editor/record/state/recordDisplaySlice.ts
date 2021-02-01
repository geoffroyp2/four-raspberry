import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";

interface RecordDisplayType {
  showLoad: boolean;
}

const initialState: RecordDisplayType = {
  showLoad: false,
};

export const recordDisplaySlice = createSlice({
  name: "recordDisplay",
  initialState,
  reducers: {
    setRecordShowLoad: (state, action: PayloadAction<boolean>) => {
      state.showLoad = action.payload;
    },
  },
});

export const { setRecordShowLoad } = recordDisplaySlice.actions;

export const selectRecordShowLoad = (state: RootState) => state.recordDisplay.showLoad;

export default recordDisplaySlice.reducer;
