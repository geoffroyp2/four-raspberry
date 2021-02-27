import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Color, Record, RecordPoint, TargetPoint } from "@baseTypes/database/GQLResTypes";

interface RecordDataType {
  needsRefresh: boolean;
  recordId: number;
  data: Record;
  tempValues: {
    color: Color;
  };
  recordPoints: RecordPoint[];
  targetPoints: TargetPoint[] | undefined;
  loadList: Record[];
}

const initialState: RecordDataType = {
  needsRefresh: false,
  recordId: 0,
  data: {},
  recordPoints: [],
  targetPoints: undefined,
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
      if (action.payload) state.recordPoints = action.payload;
    },
    setRecordTargetPoints: (state, action: PayloadAction<TargetPoint[] | undefined>) => {
      state.targetPoints = action.payload;
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
  setRecordTargetPoints,
} = recordDataSlice.actions;

export const selectRecordNeedsRefresh = (state: RootState) => state.recordData.needsRefresh;
export const selectRecordId = (state: RootState) => state.recordData.recordId;
export const selectRecordData = (state: RootState) => state.recordData.data;
export const selectRecordLoadList = (state: RootState) => state.recordData.loadList;
export const selectRecordPoints = (state: RootState) => state.recordData.recordPoints;
export const selectRecordTargetPoints = (state: RootState) => state.recordData.targetPoints;
export const selectRecordTempValues = (state: RootState) => state.recordData.tempValues;

export default recordDataSlice.reducer;
