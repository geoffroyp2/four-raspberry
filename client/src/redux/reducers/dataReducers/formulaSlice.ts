import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Formula, FormulaItem } from "@sharedTypes/dbModelTypes";
import { RootState } from "../../store";

type FormulaSliceType = {
  selected: Formula;
  memo: Formula;
};

const emptyFormula: Formula = {
  _id: "default",
  name: "",
  description: "",
  pieces: [],
  composition: [],
  lastUpdated: "",
};

const initialState: FormulaSliceType = {
  selected: emptyFormula,
  memo: emptyFormula,
};

const formulaReducer = createSlice({
  name: "formula",
  initialState,
  reducers: {
    // GENERAL
    loadFormula: (state, action: PayloadAction<Formula | null>) => {
      state.selected = action.payload || emptyFormula;
    },

    memorizeFormula: (state, action: PayloadAction<void>) => {
      state.memo = state.selected;
    },

    rollbackFormulaChanges: (state, action: PayloadAction<void>) => {
      state.selected = state.memo;
    },

    // FIELD EDITS
    setFormulaName: (state, action: PayloadAction<string>) => {
      state.selected.name = action.payload;
    },

    setFormulaDescription: (state, action: PayloadAction<string>) => {
      state.selected.description = action.payload;
    },

    // PIECES

    setFormulaPieces: (state, action: PayloadAction<string[]>) => {
      state.selected.pieces = action.payload;
    },

    addFormulaPiece: (state, action: PayloadAction<string>) => {
      state.selected.pieces.push(action.payload);
    },

    deleteFormulaPiece: (state, action: PayloadAction<string>) => {
      state.selected.pieces.splice(
        state.selected.pieces.findIndex((x) => x === action.payload),
        1
      );
    },

    // COMPOSITION
    setFormulaComposition: (state, action: PayloadAction<FormulaItem[]>) => {
      state.selected.composition = action.payload;
    },

    addFormulaChemical: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      state.selected.composition.push(action.payload);
    },

    deleteFormulaChemical: (state, action: PayloadAction<string>) => {
      state.selected.composition.splice(
        state.selected.composition.findIndex((x) => x.id === action.payload),
        1
      );
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
export const CurrentFormulaID = (state: RootState) => state.formula.selected._id;
export const CurrentFormulaName = (state: RootState) => state.formula.selected.name;
export const CurrentFormulaDescription = (state: RootState) => state.formula.selected.description;
export const CurrentFormulaComposition = (state: RootState) => state.formula.selected.composition;
export const CurrentFormulaLastUpdate = (state: RootState) => state.formula.selected.lastUpdated;

export default formulaReducer.reducer;
