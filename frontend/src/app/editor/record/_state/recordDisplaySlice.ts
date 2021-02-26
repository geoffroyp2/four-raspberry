import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

type PointZoomType = {
  start: number;
  end: number;
  amount: number;
};

interface RecordDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  loadRowSelected: number;
  pointZoom: PointZoomType;
  pieceDisplay: "list" | "grid";
}

const initialState: RecordDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  loadRowSelected: -1,
  pointZoom: {
    start: 0,
    end: 2147483647,
    amount: 70,
  },
  pieceDisplay: "list",
};

export const recordDisplaySlice = createSlice({
  name: "recordDisplay",
  initialState,
  reducers: {
    setRecordLoadPage: (state, action: PayloadAction<number>) => {
      state.loadPage = action.payload;
    },
    setRecordTotalAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = Math.floor((action.payload - 1) / state.loadAmount);
    },
    setRecordLoadRowSelected: (state, action: PayloadAction<number>) => {
      state.loadRowSelected = action.payload;
    },
    setRecordPointZoom: (state, action: PayloadAction<Partial<PointZoomType>>) => {
      state.pointZoom = { ...state.pointZoom, ...action.payload };
    },
    setRecordPieceDisplay: (state, action: PayloadAction<"list" | "grid">) => {
      state.pieceDisplay = action.payload;
    },
  },
});

export const {
  setRecordLoadPage,
  setRecordTotalAmount,
  setRecordLoadRowSelected,
  setRecordPointZoom,
  setRecordPieceDisplay,
} = recordDisplaySlice.actions;

export const selectRecordLoadPage = (state: RootState) => state.recordDisplay.loadPage;
export const selectRecordLoadAmount = (state: RootState) => state.recordDisplay.loadAmount;
export const selectRecordPageAmount = (state: RootState) => state.recordDisplay.pageAmount;
export const selectRecordLoadRowSelected = (state: RootState) => state.recordDisplay.loadRowSelected;
export const selectRecordPointZoom = (state: RootState) => state.recordDisplay.pointZoom;
export const selectRecordPieceDisplay = (state: RootState) => state.recordDisplay.pieceDisplay;

export default recordDisplaySlice.reducer;