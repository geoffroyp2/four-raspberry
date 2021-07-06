import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Color, Record, RecordPoint, TargetPoint } from "@app/_types/dbTypes";

interface RecordDataType {
  data: Record;
  tempValues: {
    color: Color;
  };
  recordPoints: RecordPoint[];
  targetPoints: TargetPoint[] | undefined;
  loadList: Record[];
  preview: Record;
  nameSearch: string | null;
}

const initialState: RecordDataType = {
  data: {},
  recordPoints: [],
  targetPoints: [],
  tempValues: {
    color: { r: 255, g: 255, b: 255, a: 1 },
  },
  loadList: [],
  preview: {},
  nameSearch: null,
};

export const recordDataSlice = createSlice({
  name: "recordData",
  initialState,
  reducers: {
    setRecordData: (state, action: PayloadAction<Record>) => {
      if (action.payload.id) {
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
      if (action.payload) state.recordPoints = action.payload;
    },
    setRecordTargetPoints: (state, action: PayloadAction<TargetPoint[] | undefined>) => {
      if (action.payload) state.targetPoints = action.payload;
    },
    setRecordPreview: (state, action: PayloadAction<Record>) => {
      state.preview = action.payload;
    },
    setRecordNameSearch: (state, action: PayloadAction<string | null>) => {
      state.nameSearch = action.payload;
    },
  },
});

export const {
  setRecordData,
  setRecordLoadList,
  setRecordTempValues,
  setRecordPoints,
  setRecordPreview,
  setRecordTargetPoints,
  setRecordNameSearch,
} = recordDataSlice.actions;

export const selectRecordData = (state: RootState) => state.recordData.data;
export const selectRecordLoadList = (state: RootState) => state.recordData.loadList;
export const selectRecordPoints = (state: RootState) => state.recordData.recordPoints;
export const selectRecordTargetPoints = (state: RootState) => state.recordData.targetPoints;
export const selectRecordTempValues = (state: RootState) => state.recordData.tempValues;
export const selectRecordPreview = (state: RootState) => state.recordData.preview;
export const selectRecordNameSearch = (state: RootState) => state.recordData.nameSearch;

export default recordDataSlice.reducer;
