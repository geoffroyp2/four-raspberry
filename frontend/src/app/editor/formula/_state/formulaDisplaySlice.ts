import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface FormulaDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  loadRowSelected: number;
  pieceDisplay: "list" | "grid";
}

const initialState: FormulaDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  loadRowSelected: -1,
  pieceDisplay: "list",
};

export const formulaDisplaySlice = createSlice({
  name: "formulaDisplay",
  initialState,
  reducers: {
    setFormulaLoadPage: (state, action: PayloadAction<number>) => {
      state.loadPage = action.payload;
    },
    setFormulaTotalAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = Math.floor(action.payload / state.loadAmount);
    },
    setFormulaLoadRowSelected: (state, action: PayloadAction<number>) => {
      state.loadRowSelected = action.payload;
    },
    setFormulaPieceDisplay: (state, action: PayloadAction<"list" | "grid">) => {
      state.pieceDisplay = action.payload;
    },
  },
});

export const { setFormulaLoadPage, setFormulaTotalAmount, setFormulaLoadRowSelected, setFormulaPieceDisplay } =
  formulaDisplaySlice.actions;

export const selectFormulaLoadPage = (state: RootState) => state.formulaDisplay.loadPage;
export const selectFormulaLoadAmount = (state: RootState) => state.formulaDisplay.loadAmount;
export const selectFormulaPageAmount = (state: RootState) => state.formulaDisplay.pageAmount;
export const selectFormulaLoadRowSelected = (state: RootState) => state.formulaDisplay.loadRowSelected;
export const selectFormulaPieceDisplay = (state: RootState) => state.formulaDisplay.pieceDisplay;

export default formulaDisplaySlice.reducer;
