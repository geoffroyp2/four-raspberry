import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Color, Record, RecordPoint } from "@app/_types/dbTypes";

interface RecordDataType {
  data: Record;
  tempValues: {
    color: Color;
  };
  points: RecordPoint[];
  loadList: Record[];
  preview: Record;
}

const initialState: RecordDataType = {
  data: {},
  points: [],
  tempValues: {
    color: { r: 255, g: 255, b: 255, a: 1 },
  },
  loadList: [],
  preview: {},
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
      if (action.payload) state.points = action.payload;
    },
    setRecordPreview: (state, action: PayloadAction<Record>) => {
      state.preview = action.payload;
    },
  },
});

export const { setRecordData, setRecordLoadList, setRecordTempValues, setRecordPoints, setRecordPreview } =
  recordDataSlice.actions;

export const selectRecordData = (state: RootState) => state.recordData.data;
export const selectRecordLoadList = (state: RootState) => state.recordData.loadList;
export const selectRecordPoints = (state: RootState) => state.recordData.points;
export const selectRecordTempValues = (state: RootState) => state.recordData.tempValues;
export const selectRecordPreview = (state: RootState) => state.recordData.preview;

export default recordDataSlice.reducer;
