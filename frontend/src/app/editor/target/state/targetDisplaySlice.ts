import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

type PointZoomType = {
  start: number;
  end: number;
  amount: number;
};

interface TargetDisplayType {
  showLoad: boolean;
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  loadRowSelected: number;
  pointZoom: PointZoomType;
  pieceDisplay: "list" | "grid";
}

const initialState: TargetDisplayType = {
  showLoad: false,
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

export const targetDisplaySlice = createSlice({
  name: "targetDisplay",
  initialState,
  reducers: {
    setTargetShowLoad: (state, action: PayloadAction<boolean>) => {
      state.showLoad = action.payload;
    },
    setTargetLoadPage: (state, action: PayloadAction<number>) => {
      state.loadPage = action.payload;
    },
    setTargetTotalAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = Math.floor(action.payload / state.loadAmount);
    },
    setTargetLoadRowSelected: (state, action: PayloadAction<number>) => {
      state.loadRowSelected = action.payload;
    },
    setTargetPointZoom: (state, action: PayloadAction<Partial<PointZoomType>>) => {
      state.pointZoom = { ...state.pointZoom, ...action.payload };
    },
    setTargetPieceDisplay: (state, action: PayloadAction<"list" | "grid">) => {
      state.pieceDisplay = action.payload;
    },
  },
});

export const {
  setTargetShowLoad,
  setTargetLoadPage,
  setTargetTotalAmount,
  setTargetLoadRowSelected,
  setTargetPointZoom,
  setTargetPieceDisplay,
} = targetDisplaySlice.actions;

export const selectTargetShowLoad = (state: RootState) => state.targetDisplay.showLoad;
export const selectTargetLoadPage = (state: RootState) => state.targetDisplay.loadPage;
export const selectTargetLoadAmount = (state: RootState) => state.targetDisplay.loadAmount;
export const selectTargetPageAmount = (state: RootState) => state.targetDisplay.pageAmount;
export const selectTargetLoadRowSelected = (state: RootState) => state.targetDisplay.loadRowSelected;
export const selectTargetPointZoom = (state: RootState) => state.targetDisplay.pointZoom;
export const selectTargetPieceDisplay = (state: RootState) => state.targetDisplay.pieceDisplay;

export default targetDisplaySlice.reducer;
