import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@src/redux/store";

export type RecordTableSortType = "name" | "date" | "lastUpdated" | "ref";

type RecordDisplayType = {
  infosEditMode: boolean;
  pointEditMode: boolean;
};

const initialState: RecordDisplayType = {
  infosEditMode: false,
  pointEditMode: false,
};

const recordDisplaySlice = createSlice({
  name: "recordDisplay",
  initialState,
  reducers: {
    setRecordPointEditMode: (state, action: PayloadAction<boolean>) => {
      state.pointEditMode = action.payload;
    },

    setRecordInfosEditMode: (state, action: PayloadAction<boolean>) => {
      state.infosEditMode = action.payload;
    },
  },
});

export const { setRecordPointEditMode, setRecordInfosEditMode } = recordDisplaySlice.actions;

export const RecordPointEditMode = (state: RootState) => state.recordDisplay.pointEditMode;
export const RecordInfosEditMode = (state: RootState) => state.recordDisplay.infosEditMode;

export default recordDisplaySlice.reducer;
