import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@src/redux/store";

type PieceDisplayType = {
  infosEditMode: boolean;
};

const initialState: PieceDisplayType = {
  infosEditMode: false,
};

const pieceDisplaySlice = createSlice({
  name: "pieceDisplay",
  initialState,
  reducers: {
    setPieceInfosEditMode: (state, action: PayloadAction<boolean>) => {
      state.infosEditMode = action.payload;
    },
  },
});

export const { setPieceInfosEditMode } = pieceDisplaySlice.actions;

export const PieceInfosEditMode = (state: RootState) => state.pieceDisplay.infosEditMode;

export default pieceDisplaySlice.reducer;
