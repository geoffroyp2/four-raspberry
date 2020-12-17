import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompositionElement, Formula } from "@sharedTypes/dbModelTypes";
import { RootState } from "../../store";

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

export const CurrentFormula = (state: RootState) => state.formula.selected;
export const CurrentFormulaID = (state: RootState) => state.formula.selected!._id;
export const CurrentFormulaName = (state: RootState) => state.formula.selected!.name;
export const CurrentFormulaDescription = (state: RootState) => state.formula.selected!.description;
export const CurrentFormulaComposition = (state: RootState) => state.formula.selected!.composition;
export const CurrentFormulaLastUpdate = (state: RootState) => state.formula.selected!.lastUpdated;

export default formulaReducer.reducer;
