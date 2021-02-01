import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";
import { Record } from "@baseTypes/database/GQLResTypes";

interface recordDataType {
  data: Record;
  edit: Record;
}

const initialState: recordDataType = {
  data: {},
  edit: {},
};

export const recordDataSlice = createSlice({
  name: "recordData",
  initialState,
  reducers: {
    setRecordData: (state, action: PayloadAction<Record>) => {
      state.data = action.payload;
    },
  },
});

export const { setRecordData } = recordDataSlice.actions;

export const recordData = (state: RootState) => state.recordData.data;

export default recordDataSlice.reducer;
