import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface PieceDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  loadRowSelected: number;
}

const initialState: PieceDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  loadRowSelected: -1,
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
    setPieceLoadRowSelected: (state, action: PayloadAction<number>) => {
      state.loadRowSelected = action.payload;
    },
  },
});

export const { setPieceLoadPage, setPieceTotalAmount, setPieceLoadRowSelected } = pieceDisplaySlice.actions;

export const selectPieceLoadPage = (state: RootState) => state.pieceDisplay.loadPage;
export const selectPieceLoadAmount = (state: RootState) => state.pieceDisplay.loadAmount;
export const selectPiecePageAmount = (state: RootState) => state.pieceDisplay.pageAmount;
export const selectPieceLoadRowSelected = (state: RootState) => state.pieceDisplay.loadRowSelected;

export default pieceDisplaySlice.reducer;
