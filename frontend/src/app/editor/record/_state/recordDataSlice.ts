import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Color, Record, RecordPoint } from "@baseTypes/database/GQLResTypes";

interface RecordDataType {
  needsRefresh: boolean;
  recordId: number;
  data: Record;
  tempValues: {
    color: Color;
  };
  points: RecordPoint[];
  loadList: Record[];
}

const initialState: RecordDataType = {
  needsRefresh: false,
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
    setRecordNeedsRefresh: (state, action: PayloadAction<boolean>) => {
      state.needsRefresh = action.payload;
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
  setRecordNeedsRefresh,
  setRecordLoadList,
  setRecordPoints,
  setRecordTempValues,
} = recordDataSlice.actions;

export const selectRecordNeedsRefresh = (state: RootState) => state.recordData.needsRefresh;
export const selectRecordId = (state: RootState) => state.recordData.recordId;
export const selectRecordData = (state: RootState) => state.recordData.data;
export const selectRecordLoadList = (state: RootState) => state.recordData.loadList;
export const selectRecordPoints = (state: RootState) => state.recordData.points;
export const selectRecordTempValues = (state: RootState) => state.recordData.tempValues;

export default recordDataSlice.reducer;
