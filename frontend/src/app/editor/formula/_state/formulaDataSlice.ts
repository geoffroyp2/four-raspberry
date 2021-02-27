import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Formula } from "@baseTypes/database/GQLResTypes";
interface FormulaDataType {
  needsRefresh: boolean;
  formulaId: number;
  data: Formula;
  loadList: Formula[];
}

const initialState: FormulaDataType = {
  needsRefresh: false,
  formulaId: 0,
  data: {},
  loadList: [],
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
      }
    },
    setFormulaNeedsRefresh: (state, action: PayloadAction<boolean>) => {
      state.needsRefresh = action.payload;
    },
    setFormulaLoadList: (state, action: PayloadAction<Formula[]>) => {
      state.loadList = action.payload;
    },
  },
});

export const { setFormulaId, setFormulaData, setFormulaLoadList, setFormulaNeedsRefresh } = formulaDataSlice.actions;

export const selectFormulaNeedsRefresh = (state: RootState) => state.formulaData.needsRefresh;
export const selectFormulaId = (state: RootState) => state.formulaData.formulaId;
export const selectFormulaData = (state: RootState) => state.formulaData.data;
export const selectFormulaLoadList = (state: RootState) => state.formulaData.loadList;

export default formulaDataSlice.reducer;
