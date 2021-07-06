import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Piece } from "@app/_types/dbTypes";

interface PieceDataType {
  data: Piece;
  loadList: Piece[];
  preview: Piece;
  nameSearch: string | null;
}

const initialState: PieceDataType = {
  data: {},
  loadList: [],
  preview: {},
  nameSearch: null,
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
    setPieceNameSearch: (state, action: PayloadAction<string | null>) => {
      state.nameSearch = action.payload;
    },
  },
});

export const { setPieceData, setPieceLoadList, setPiecePreview, setPieceNameSearch } = pieceDataSlice.actions;

export const selectPieceData = (state: RootState) => state.pieceData.data;
export const selectPieceLoadList = (state: RootState) => state.pieceData.loadList;
export const selectPiecePreview = (state: RootState) => state.pieceData.preview;
export const selectPieceNameSearch = (state: RootState) => state.pieceData.nameSearch;

export default pieceDataSlice.reducer;
