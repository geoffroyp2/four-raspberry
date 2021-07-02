import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface PieceDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  loadId: number | null;
  redirect: "url" | "api" | null;
}

const initialState: PieceDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  loadId: null,
  redirect: null,
};

export const pieceDisplaySlice = createSlice({
  name: "pieceDisplay",
  initialState,
  reducers: {
    setPieceLoadPage: (state, action: PayloadAction<number>) => {
      state.loadPage = action.payload;
    },
    setPieceTotalAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = Math.floor((action.payload - 1) / state.loadAmount);
    },
    setPieceLoadId: (state, action: PayloadAction<number>) => {
      state.loadId = action.payload;
    },
    setPieceRedirect: (state, action: PayloadAction<PieceDisplayType["redirect"]>) => {
      state.redirect = action.payload;
    },
  },
});

export const { setPieceLoadPage, setPieceTotalAmount, setPieceLoadId, setPieceRedirect } = pieceDisplaySlice.actions;

export const selectPieceLoadPage = (state: RootState) => state.pieceDisplay.loadPage;
export const selectPieceLoadAmount = (state: RootState) => state.pieceDisplay.loadAmount;
export const selectPiecePageAmount = (state: RootState) => state.pieceDisplay.pageAmount;
export const selectPieceLoadId = (state: RootState) => state.pieceDisplay.loadId;
export const selectPieceRedirect = (state: RootState) => state.pieceDisplay.redirect;

export default pieceDisplaySlice.reducer;
