import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Piece } from "@sharedTypes/dbModelTypes";
import { RootState } from "../store";

type PieceSliceType = {
  selected: Piece | null;
  memo: Piece | null;
};

const initialState: PieceSliceType = {
  selected: null,
  memo: null,
};

const pieceReducer = createSlice({
  name: "piece",
  initialState,
  reducers: {
    // GENERAL
    loadPiece: (state, action: PayloadAction<Piece>) => {
      state.selected = action.payload;
    },

    memorizePiece: (state, action: PayloadAction<void>) => {
      state.memo = state.selected;
    },

    rollbackPieceChanges: (state, action: PayloadAction<void>) => {
      state.selected = state.memo;
    },

    // FIELD EDITS
    setPieceName: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.name = action.payload;
    },

    setPieceDescription: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.description = action.payload;
    },

    setPieceFormula: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.formula = action.payload;
    },

    setPieceDate: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.date = action.payload;
    },

    // RECORDS
    setPieceRecords: (state, action: PayloadAction<string[]>) => {
      if (state.selected) state.selected.records = action.payload;
    },

    addPieceRecord: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.records.push(action.payload);
    },

    deletePieceRecord: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.records.splice(state.selected.records.indexOf(action.payload), 1);
    },

    // IMAGES
    setPieceImages: (state, action: PayloadAction<string[]>) => {
      if (state.selected) state.selected.images = action.payload;
    },

    addPieceImage: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.images.push(action.payload);
    },

    deletePieceImage: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.images.splice(state.selected.images.indexOf(action.payload), 1);
    },
  },
});

export const {
  loadPiece,
  memorizePiece,
  rollbackPieceChanges,

  setPieceName,
  setPieceDescription,
  setPieceFormula,
  setPieceDate,

  setPieceRecords,
  addPieceRecord,
  deletePieceRecord,

  setPieceImages,
  addPieceImage,
  deletePieceImage,
} = pieceReducer.actions;

export const piece = (state: RootState) => state.pieceReducer.selected;
export const pieceID = (state: RootState) => state.pieceReducer.selected!._id;
export const pieceName = (state: RootState) => state.pieceReducer.selected!.name;
export const pieceDescription = (state: RootState) => state.pieceReducer.selected!.description;
export const pieceFormula = (state: RootState) => state.pieceReducer.selected!.formula;
export const pieceDate = (state: RootState) => state.pieceReducer.selected!.date;
export const pieceRecords = (state: RootState) => state.pieceReducer.selected!.records;
export const pieceImages = (state: RootState) => state.pieceReducer.selected!.images;

export default pieceReducer.reducer;
