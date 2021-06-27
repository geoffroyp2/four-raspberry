import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { PointFilter } from "@app/_types/queryTypes";

type PointZoomType = Required<PointFilter>;

interface RecordDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  loadId: number | null;
  pointZoom: PointZoomType;
}

const initialState: RecordDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  loadId: null,
  pointZoom: {
    start: 0,
    end: 2147483647,
    amount: 70,
  },
};

export const recordDisplaySlice = createSlice({
  name: "recordDisplay",
  initialState,
  reducers: {
    setRecordLoadPage: (state, action: PayloadAction<number>) => {
      state.loadPage = action.payload;
    },
    setRecordTotalAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = Math.floor(action.payload / state.loadAmount);
    },
    setRecordLoadId: (state, action: PayloadAction<number>) => {
      state.loadId = action.payload;
    },
    setRecordPointZoom: (state, action: PayloadAction<Partial<PointZoomType>>) => {
      state.pointZoom = { ...state.pointZoom, ...action.payload };
    },
  },
});

export const { setRecordLoadPage, setRecordTotalAmount, setRecordLoadId, setRecordPointZoom } = recordDisplaySlice.actions;

export const selectRecordLoadPage = (state: RootState) => state.recordDisplay.loadPage;
export const selectRecordLoadAmount = (state: RootState) => state.recordDisplay.loadAmount;
export const selectRecordPageAmount = (state: RootState) => state.recordDisplay.pageAmount;
export const selectRecordLoadId = (state: RootState) => state.recordDisplay.loadId;
export const selectRecordPointZoom = (state: RootState) => state.recordDisplay.pointZoom;

export default recordDisplaySlice.reducer;
