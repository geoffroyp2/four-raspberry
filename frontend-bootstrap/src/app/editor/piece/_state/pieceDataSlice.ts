import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Piece } from "@baseTypes/database/GQLResTypes";

interface PieceDataType {
  needsRefresh: boolean;
  pieceId: number;
  data: Piece;
  loadList: Piece[];
}

const initialState: PieceDataType = {
  needsRefresh: false,
  pieceId: 0,
  data: {},
  loadList: [],
};

export const pieceDataSlice = createSlice({
  name: "pieceData",
  initialState,
  reducers: {
    setPieceId: (state, action: PayloadAction<number>) => {
      state.pieceId = action.payload;
    },
    setPieceData: (state, action: PayloadAction<Piece>) => {
      if (action.payload.id) {
        state.pieceId = action.payload.id;
        state.data = action.payload;
      }
    },
    setPieceNeedsRefresh: (state, action: PayloadAction<boolean>) => {
      state.needsRefresh = action.payload;
    },
    setPieceLoadList: (state, action: PayloadAction<Piece[]>) => {
      state.loadList = action.payload;
    },
  },
});

export const { setPieceId, setPieceData, setPieceNeedsRefresh, setPieceLoadList } = pieceDataSlice.actions;

export const selectPieceNeedsRefresh = (state: RootState) => state.pieceData.needsRefresh;
export const selectPieceId = (state: RootState) => state.pieceData.pieceId;
export const selectPieceData = (state: RootState) => state.pieceData.data;
export const selectPieceLoadList = (state: RootState) => state.pieceData.loadList;

export default pieceDataSlice.reducer;
