import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";
import { Record, RecordPoint } from "@baseTypes/database/GQLResTypes";

interface recordDataType {
  recordId: number;
  data: Record;
  points: RecordPoint[];
  loadList: Record[];
}

const initialState: recordDataType = {
  recordId: 1,
  data: {},
  points: [],
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
    setRecordPoints: (state, action: PayloadAction<RecordPoint[] | undefined>) => {
      if (action.payload) state.points = action.payload;
    },
  },
});

export const { setCurrentRecordId, setRecordData, setRecordLoadList, setRecordPoints } = recordDataSlice.actions;

export const selectCurrentRecordId = (state: RootState) => state.recordData.recordId;
export const selectRecordData = (state: RootState) => state.recordData.data;
export const selectRecordLoadList = (state: RootState) => state.recordData.loadList;
export const selectRecordPoints = (state: RootState) => state.recordData.points;

export default recordDataSlice.reducer;
