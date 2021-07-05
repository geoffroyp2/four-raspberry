import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface ChemicalDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  loadRowSelected: number;
}

const initialState: ChemicalDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  loadRowSelected: -1,
};

export const chemicalDisplaySlice = createSlice({
  name: "chemicalDisplay",
  initialState,
  reducers: {
    setChemicalLoadPage: (state, action: PayloadAction<number>) => {
      state.loadPage = action.payload;
    },
    setChemicalTotalAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = Math.floor(action.payload / state.loadAmount);
    },
    setChemicalLoadRowSelected: (state, action: PayloadAction<number>) => {
      state.loadRowSelected = action.payload;
    },
  },
});

export const { setChemicalLoadPage, setChemicalTotalAmount, setChemicalLoadRowSelected } = chemicalDisplaySlice.actions;

export const selectChemicalLoadPage = (state: RootState) => state.chemicalDisplay.loadPage;
export const selectChemicalLoadAmount = (state: RootState) => state.chemicalDisplay.loadAmount;
export const selectChemicalPageAmount = (state: RootState) => state.chemicalDisplay.pageAmount;
export const selectChemicalLoadRowSelected = (state: RootState) => state.chemicalDisplay.loadRowSelected;

export default chemicalDisplaySlice.reducer;
