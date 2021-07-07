import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Record, RecordPoint, TargetPoint } from "@app/_types/dbTypes";

interface RecordDataType {
  data: Record;
  recordPoints: RecordPoint[];
  targetPoints: TargetPoint[] | undefined;
  loadList: Record[];
  preview: Record;
}

const initialState: RecordDataType = {
  data: {},
  recordPoints: [],
  targetPoints: [],
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
      }
    },
    setRecordLoadList: (state, action: PayloadAction<Record[]>) => {
      state.loadList = action.payload;
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
  },
});

export const { setRecordData, setRecordLoadList, setRecordPoints, setRecordPreview, setRecordTargetPoints } =
  recordDataSlice.actions;

export const selectRecordData = (state: RootState) => state.recordData.data;
export const selectRecordLoadList = (state: RootState) => state.recordData.loadList;
export const selectRecordColor = (state: RootState) => state.recordData.data.color;
export const selectRecordPoints = (state: RootState) => state.recordData.recordPoints;
export const selectRecordTargetPoints = (state: RootState) => state.recordData.targetPoints;
export const selectRecordPreview = (state: RootState) => state.recordData.preview;

export default recordDataSlice.reducer;
