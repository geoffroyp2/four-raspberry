import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Formula, Ingredient } from "@baseTypes/database/GQLResTypes";
interface FormulaDataType {
  needsRefresh: boolean;
  formulaId: number;
  data: Formula;
  loadList: Formula[];
  tempIngredients: Ingredient[];
}

const initialState: FormulaDataType = {
  needsRefresh: false,
  formulaId: 0,
  data: {},
  loadList: [],
  tempIngredients: [],
};

export const formulaDataSlice = createSlice({
  name: "formulaData",
  initialState,
  reducers: {
    setFormulaId: (state, action: PayloadAction<number>) => {
      state.formulaId = action.payload;
    },
    setFormulaData: (state, action: PayloadAction<Formula>) => {
      if (action.payload.id) {
        state.formulaId = action.payload.id;
        state.data = action.payload;
        if (action.payload.ingredients) state.tempIngredients = action.payload.ingredients;
      }
    },
    setFormulaNeedsRefresh: (state, action: PayloadAction<boolean>) => {
      state.needsRefresh = action.payload;
    },
    setFormulaLoadList: (state, action: PayloadAction<Formula[]>) => {
      state.loadList = action.payload;
    },
    setFormulaTempIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.tempIngredients = action.payload;
    },
    resetFormulaTempIngredients: (state, action: PayloadAction<void>) => {
      if (state.data.ingredients) state.tempIngredients = state.data.ingredients;
      else state.tempIngredients = [];
    },
  },
});

export const {
  setFormulaId,
  setFormulaData,
  setFormulaLoadList,
  setFormulaNeedsRefresh,
  setFormulaTempIngredients,
  resetFormulaTempIngredients,
} = formulaDataSlice.actions;

export const selectFormulaNeedsRefresh = (state: RootState) => state.formulaData.needsRefresh;
export const selectFormulaId = (state: RootState) => state.formulaData.formulaId;
export const selectFormulaData = (state: RootState) => state.formulaData.data;
export const selectFormulaLoadList = (state: RootState) => state.formulaData.loadList;
export const selectFormulaTempIngredients = (state: RootState) => state.formulaData.tempIngredients;

export default formulaDataSlice.reducer;
