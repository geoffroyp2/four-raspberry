import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";

type PointZoomType = {
  start: number;
  end: number;
  amount: number;
};

interface RecordDisplayType {
  showLoad: boolean;
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  loadRowSelected: number;
  pointZoom: PointZoomType;
}

const initialState: RecordDisplayType = {
  showLoad: false,
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  loadRowSelected: -1,
  pointZoom: {
    start: 0,
    end: 2147483647,
    amount: 30,
  },
};

export const recordDisplaySlice = createSlice({
  name: "recordDisplay",
  initialState,
  reducers: {
    setRecordShowLoad: (state, action: PayloadAction<boolean>) => {
      state.showLoad = action.payload;
    },
    setRecordLoadPage: (state, action: PayloadAction<number>) => {
      state.loadPage = action.payload;
    },
    setRecordTotalAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = Math.floor(action.payload / state.loadAmount);
    },
    setRecordLoadRowSelected: (state, action: PayloadAction<number>) => {
      state.loadRowSelected = action.payload;
    },
    setRecordPointZoom: (state, action: PayloadAction<Partial<PointZoomType>>) => {
      state.pointZoom = { ...state.pointZoom, ...action.payload };
    },
  },
});

export const {
  setRecordShowLoad,
  setRecordLoadPage,
  setRecordTotalAmount,
  setRecordLoadRowSelected,
  setRecordPointZoom,
} = recordDisplaySlice.actions;

export const selectRecordShowLoad = (state: RootState) => state.recordDisplay.showLoad;
export const selectRecordLoadPage = (state: RootState) => state.recordDisplay.loadPage;
export const selectRecordLoadAmount = (state: RootState) => state.recordDisplay.loadAmount;
export const selectRecordPageAmount = (state: RootState) => state.recordDisplay.pageAmount;
export const selectRecordLoadRowSelected = (state: RootState) => state.recordDisplay.loadRowSelected;
export const selectRecordPointZoom = (state: RootState) => state.recordDisplay.pointZoom;

export default recordDisplaySlice.reducer;