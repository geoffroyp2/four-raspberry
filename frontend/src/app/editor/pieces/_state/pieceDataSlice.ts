import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Piece } from "@app/_types/dbTypes";

interface PieceDataType {
  data: Piece;
  loadList: Piece[];
  preview: Piece;
}

const initialState: PieceDataType = {
  data: {},
  loadList: [],
  preview: {},
};

export const pieceDataSlice = createSlice({
  name: "pieceData",
  initialState,
  reducers: {
    setPieceData: (state, action: PayloadAction<Piece>) => {
      if (action.payload.id) {
        state.data = action.payload;
      }
    },
    setPieceLoadList: (state, action: PayloadAction<Piece[]>) => {
      state.loadList = action.payload;
    },
    setPiecePreview: (state, action: PayloadAction<Piece>) => {
      state.preview = action.payload;
    },
  },
});

export const { setPieceData, setPieceLoadList, setPiecePreview } = pieceDataSlice.actions;

export const selectPieceData = (state: RootState) => state.pieceData.data;
export const selectPieceLoadList = (state: RootState) => state.pieceData.loadList;
export const selectPiecePreview = (state: RootState) => state.pieceData.preview;

export default pieceDataSlice.reducer;
