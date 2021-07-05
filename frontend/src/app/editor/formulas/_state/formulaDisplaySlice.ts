import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface FormulaDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  loadId: number | null;
}

const initialState: FormulaDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  loadId: null,
};

export const formulaDisplaySlice = createSlice({
  name: "formulaDisplay",
  initialState,
  reducers: {
    setFormulaLoadPage: (state, action: PayloadAction<number>) => {
      state.loadPage = action.payload;
    },
    setFormulaTotalAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = Math.floor((action.payload - 1) / state.loadAmount);
    },
    setFormulaLoadId: (state, action: PayloadAction<number>) => {
      state.loadId = action.payload;
    },
  },
});

export const { setFormulaLoadPage, setFormulaTotalAmount, setFormulaLoadId } = formulaDisplaySlice.actions;

export const selectFormulaLoadPage = (state: RootState) => state.formulaDisplay.loadPage;
export const selectFormulaLoadAmount = (state: RootState) => state.formulaDisplay.loadAmount;
export const selectFormulaPageAmount = (state: RootState) => state.formulaDisplay.pageAmount;
export const selectFormulaLoadId = (state: RootState) => state.formulaDisplay.loadId;

export default formulaDisplaySlice.reducer;
