import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface Pending {
  data: boolean;
  name: boolean;
  description: boolean;
}

interface Edit {
  name: boolean;
  description: boolean;
}

interface PieceStateType {
  pending: Pending;
  edit: Edit;
}

const initialState: PieceStateType = {
  pending: {
    data: false,
    name: false,
    description: false,
  },
  edit: {
    name: false,
    description: false,
  },
};

export const pieceStateSlice = createSlice({
  name: "piecetate",
  initialState,
  reducers: {
    setPiecePending: (state, action: PayloadAction<Partial<Pending>>) => {
      Object.entries(action.payload).forEach((e) => {
        const [key, value] = e;
        state.pending[key as keyof Pending] = value!;
      });
    },
    setPieceEdit: (state, action: PayloadAction<Partial<Edit>>) => {
      // Only one edit at a time
      Object.entries(state.edit).forEach(([key]) => {
        state.edit[key as keyof Edit] = false;
      });
      state.edit = { ...state.edit, ...action.payload };
    },
  },
});

export const { setPiecePending, setPieceEdit } = pieceStateSlice.actions;

export const selectPiecePending = (state: RootState) => state.pieceState.pending;
export const selectPieceEdit = (state: RootState) => state.pieceState.edit;

export default pieceStateSlice.reducer;
