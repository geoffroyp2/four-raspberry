import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface PieceDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  mainLoadId: number | null;
  previewLoadId: number | null;
  nameSearch: string | null;
  sortParam: "name" | "id" | "createdAt" | "updatedAt" | "formula";
  sortDirection: "ASC" | "DESC";
}

const initialState: PieceDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  mainLoadId: null,
  previewLoadId: null,
  nameSearch: null,
  sortParam: "id",
  sortDirection: "ASC",
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
    setPieceMainLoadId: (state, action: PayloadAction<number>) => {
      state.mainLoadId = action.payload;
    },
    setPiecePreviewLoadId: (state, action: PayloadAction<number>) => {
      state.previewLoadId = action.payload;
    },
    setPieceNameSearch: (state, action: PayloadAction<string | null>) => {
      state.nameSearch = action.payload;
    },
    setPieceSortParam: (state, action: PayloadAction<PieceDisplayType["sortParam"]>) => {
      state.sortParam = action.payload;
    },
    setPieceSortDirection: (state, action: PayloadAction<PieceDisplayType["sortDirection"]>) => {
      state.sortDirection = action.payload;
    },
  },
});

export const {
  setPieceLoadPage,
  setPieceTotalAmount,
  setPieceMainLoadId,
  setPiecePreviewLoadId,
  setPieceNameSearch,
  setPieceSortParam,
  setPieceSortDirection,
} = pieceDisplaySlice.actions;

export const selectPieceLoadPage = (state: RootState) => state.pieceDisplay.loadPage;
export const selectPieceLoadAmount = (state: RootState) => state.pieceDisplay.loadAmount;
export const selectPiecePageAmount = (state: RootState) => state.pieceDisplay.pageAmount;
export const selectPieceMainLoadId = (state: RootState) => state.pieceDisplay.mainLoadId;
export const selectPiecePreviewLoadId = (state: RootState) => state.pieceDisplay.previewLoadId;
export const selectPieceNameSearch = (state: RootState) => state.pieceDisplay.nameSearch;
export const selectPieceSortParam = (state: RootState) => state.pieceDisplay.sortParam;
export const selectPieceSortDirection = (state: RootState) => state.pieceDisplay.sortDirection;

export default pieceDisplaySlice.reducer;
