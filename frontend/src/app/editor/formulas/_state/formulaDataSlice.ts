import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Formula } from "@app/_types/dbTypes";

interface FormulaDataType {
  data: Formula;
  loadList: Formula[];
  preview: Formula;
  nameSearch: string | null;
}

const initialState: FormulaDataType = {
  data: {},
  loadList: [],
  preview: {},
  nameSearch: null,
};

export const formulaDataSlice = createSlice({
  name: "formulaData",
  initialState,
  reducers: {
    setFormulaData: (state, action: PayloadAction<Formula>) => {
      if (action.payload.id) {
        state.data = action.payload;
      }
    },
    setFormulaLoadList: (state, action: PayloadAction<Formula[]>) => {
      state.loadList = action.payload;
    },
    setFormulaPreview: (state, action: PayloadAction<Formula>) => {
      state.preview = action.payload;
    },
    setFormulaNameSearch: (state, action: PayloadAction<string | null>) => {
      state.nameSearch = action.payload;
    },
  },
});

export const { setFormulaData, setFormulaLoadList, setFormulaPreview, setFormulaNameSearch } = formulaDataSlice.actions;

export const selectFormulaData = (state: RootState) => state.formulaData.data;
export const selectFormulaLoadList = (state: RootState) => state.formulaData.loadList;
export const selectFormulaPreview = (state: RootState) => state.formulaData.preview;
export const selectFormulaNameSearch = (state: RootState) => state.formulaData.nameSearch;

export default formulaDataSlice.reducer;
