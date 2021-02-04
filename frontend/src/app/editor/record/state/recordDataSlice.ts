import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";
import { Record } from "@baseTypes/database/GQLResTypes";

interface recordDataType {
  recordId: number;
  data: Record;
  edit: Record;
  loadList: Record[];
}

const initialState: recordDataType = {
  recordId: 1,
  data: {},
  edit: {},
  loadList: [],
};

export const recordDataSlice = createSlice({
  name: "recordData",
  initialState,
  reducers: {
    setCurrentRecordId: (state, action: PayloadAction<number>) => {
      state.recordId = action.payload;
    },
    setRecordData: (state, action: PayloadAction<Record>) => {
      state.data = action.payload;
    },
    setRecordLoadList: (state, action: PayloadAction<Record[]>) => {
      state.loadList = action.payload;
    },
  },
});

export const { setCurrentRecordId, setRecordData, setRecordLoadList } = recordDataSlice.actions;

export const selectCurrentRecordId = (state: RootState) => state.recordData.recordId;
export const selectRecordData = (state: RootState) => state.recordData.data;
export const selectRecordLoadList = (state: RootState) => state.recordData.loadList;

export default recordDataSlice.reducer;
