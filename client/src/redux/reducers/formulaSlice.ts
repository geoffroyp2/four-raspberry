import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompositionElement, Formula } from "@sharedTypes/dbModelTypes";
import { RootState } from "../store";

type FormulaSliceType = {
  selected: Formula | null;
  memo: Formula | null;
};

const initialState: FormulaSliceType = {
  selected: null,
  memo: null,
};

const formulaReducer = createSlice({
  name: "formula",
  initialState,
  reducers: {
    // GENERAL
    loadFormula: (state, action: PayloadAction<Formula>) => {
      state.selected = action.payload;
    },

    memorizeFormula: (state, action: PayloadAction<void>) => {
      state.memo = state.selected;
    },

    rollbackFormulaChanges: (state, action: PayloadAction<void>) => {
      state.selected = state.memo;
    },

    // FIELD EDITS
    setFormulaName: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.name = action.payload;
    },

    setFormulaDescription: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.description = action.payload;
    },

    // COMPOSITION

    setFormulaComposition: (state, action: PayloadAction<CompositionElement[]>) => {
      if (state.selected) state.selected.composition = action.payload;
    },

    addFormulaChemical: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      if (state.selected) state.selected.composition.push(action.payload);
    },

    deleteFormulaChemical: (state, action: PayloadAction<string>) => {
      if (state.selected) {
        state.selected.composition.splice(
          state.selected.composition.findIndex((x) => x.id === action.payload),
          1
        );
      }
    },
  },
});

export const {
  loadFormula,
  memorizeFormula,
  rollbackFormulaChanges,

  setFormulaName,
  setFormulaDescription,

  setFormulaComposition,
  addFormulaChemical,
  deleteFormulaChemical,
} = formulaReducer.actions;

export const formula = (state: RootState) => state.formulaReducer.selected;
export const formulaID = (state: RootState) => state.formulaReducer.selected!._id;
export const formulaName = (state: RootState) => state.formulaReducer.selected!.name;
export const formulaDescription = (state: RootState) => state.formulaReducer.selected!.description;
export const formulaComposition = (state: RootState) => state.formulaReducer.selected!.composition;

export default formulaReducer.reducer;
