import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface FormulaDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  mainLoadId: number | null;
  previewLoadId: number | null;
  nameSearch: string | null;
  sortParam: "name" | "id" | "createdAt" | "updatedAt" | "target";
  sortDirection: "ASC" | "DESC";
}

const initialState: FormulaDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  mainLoadId: null,
  previewLoadId: null,
  nameSearch: null,
  sortParam: "id",
  sortDirection: "ASC",
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
    setFormulaMainLoadId: (state, action: PayloadAction<number>) => {
      state.mainLoadId = action.payload;
    },
    setFormulaPreviewLoadId: (state, action: PayloadAction<number>) => {
      state.previewLoadId = action.payload;
    },
    setFormulaNameSearch: (state, action: PayloadAction<string | null>) => {
      state.nameSearch = action.payload;
    },
    setFormulaSortParam: (state, action: PayloadAction<FormulaDisplayType["sortParam"]>) => {
      state.sortParam = action.payload;
    },
    setFormulaSortDirection: (state, action: PayloadAction<FormulaDisplayType["sortDirection"]>) => {
      state.sortDirection = action.payload;
    },
  },
});

export const {
  setFormulaLoadPage,
  setFormulaTotalAmount,
  setFormulaMainLoadId,
  setFormulaPreviewLoadId,
  setFormulaNameSearch,
  setFormulaSortParam,
  setFormulaSortDirection,
} = formulaDisplaySlice.actions;

export const selectFormulaLoadPage = (state: RootState) => state.formulaDisplay.loadPage;
export const selectFormulaLoadAmount = (state: RootState) => state.formulaDisplay.loadAmount;
export const selectFormulaPageAmount = (state: RootState) => state.formulaDisplay.pageAmount;
export const selectFormulaMainLoadId = (state: RootState) => state.formulaDisplay.mainLoadId;
export const selectFormulaPreviewLoadId = (state: RootState) => state.formulaDisplay.previewLoadId;
export const selectFormulaNameSearch = (state: RootState) => state.formulaDisplay.nameSearch;
export const selectFormulaSortParam = (state: RootState) => state.formulaDisplay.sortParam;
export const selectFormulaSortDirection = (state: RootState) => state.formulaDisplay.sortDirection;

export default formulaDisplaySlice.reducer;
