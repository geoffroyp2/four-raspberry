import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";
import { Color, Record, RecordPoint } from "@baseTypes/database/GQLResTypes";

interface recordDataType {
  recordId: number;
  data: Record;
  tempValues: {
    color: Color;
  };
  points: RecordPoint[];
  loadList: Record[];
}

const initialState: recordDataType = {
  recordId: 1,
  data: {},
  points: [],
  tempValues: {
    color: { r: 255, g: 255, b: 255, a: 1 },
  },
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

      if (action.payload.color) {
        state.tempValues.color = action.payload.color;
      }
    },
    setRecordLoadList: (state, action: PayloadAction<Record[]>) => {
      state.loadList = action.payload;
    },
    setRecordTempValues: (state, action: PayloadAction<Partial<recordDataType["tempValues"]>>) => {
      state.tempValues = { ...state.tempValues, ...action.payload };
    },
    setRecordPoints: (state, action: PayloadAction<RecordPoint[] | undefined>) => {
      if (action.payload) state.points = action.payload;
    },
  },
});

export const {
  setCurrentRecordId,
  setRecordData,
  setRecordLoadList,
  setRecordPoints,
  setRecordTempValues,
} = recordDataSlice.actions;

export const selectCurrentRecordId = (state: RootState) => state.recordData.recordId;
export const selectRecordData = (state: RootState) => state.recordData.data;
export const selectRecordLoadList = (state: RootState) => state.recordData.loadList;
export const selectRecordPoints = (state: RootState) => state.recordData.points;
export const selectRecordTempValues = (state: RootState) => state.recordData.tempValues;

export default recordDataSlice.reducer;
