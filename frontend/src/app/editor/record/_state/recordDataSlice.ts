import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Color, Record, RecordPoint } from "@baseTypes/database/GQLResTypes";

interface RecordDataType {
  recordId: number;
  data: Record;
  tempValues: {
    color: Color;
  };
  points: RecordPoint[];
  loadList: Record[];
}

const initialState: RecordDataType = {
  recordId: 0,
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
    setRecordId: (state, action: PayloadAction<number>) => {
      state.recordId = action.payload;
    },
    setRecordData: (state, action: PayloadAction<Record>) => {
      if (action.payload.id) {
        state.recordId = action.payload.id;
        state.data = action.payload;

        if (action.payload.color) {
          state.tempValues.color = action.payload.color;
        }
      }
    },
    setRecordLoadList: (state, action: PayloadAction<Record[]>) => {
      state.loadList = action.payload;
    },
    setRecordTempValues: (state, action: PayloadAction<Partial<RecordDataType["tempValues"]>>) => {
      state.tempValues = { ...state.tempValues, ...action.payload };
    },
    setRecordPoints: (state, action: PayloadAction<RecordPoint[] | undefined>) => {
      if (action.payload) state.points = action.payload;
    },
  },
});

export const {
  setRecordId,
  setRecordData,
  setRecordLoadList,
  setRecordPoints,
  setRecordTempValues,
} = recordDataSlice.actions;

export const selectRecordId = (state: RootState) => state.recordData.recordId;
export const selectRecordData = (state: RootState) => state.recordData.data;
export const selectRecordLoadList = (state: RootState) => state.recordData.loadList;
export const selectRecordPoints = (state: RootState) => state.recordData.points;
export const selectRecordTempValues = (state: RootState) => state.recordData.tempValues;

export default recordDataSlice.reducer;
