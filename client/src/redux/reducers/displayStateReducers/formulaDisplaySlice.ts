import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@src/redux/store";

type FormulaDisplayType = {
  infosEditMode: boolean;
};

const initialState: FormulaDisplayType = {
  infosEditMode: false,
};

const formulaDisplaySlice = createSlice({
  name: "formulaDisplay",
  initialState,
  reducers: {
    setFormulaInfosEditMode: (state, action: PayloadAction<boolean>) => {
      state.infosEditMode = action.payload;
    },
  },
});

export const { setFormulaInfosEditMode } = formulaDisplaySlice.actions;

export const FormulaInfosEditMode = (state: RootState) => state.formulaDisplay.infosEditMode;

export default formulaDisplaySlice.reducer;
