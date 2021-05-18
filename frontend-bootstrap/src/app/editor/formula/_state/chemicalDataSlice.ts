import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Chemical } from "@baseTypes/database/GQLResTypes";

interface ChemicalDataType {
  loadList: Chemical[];
}

const initialState: ChemicalDataType = {
  loadList: [],
};

export const chemicalDataSlice = createSlice({
  name: "chemicalData",
  initialState,
  reducers: {
    setChemicalLoadList: (state, action: PayloadAction<Chemical[]>) => {
      state.loadList = action.payload;
    },
  },
});

export const { setChemicalLoadList } = chemicalDataSlice.actions;

export const selectChemicalLoadList = (state: RootState) => state.chemicalData.loadList;

export default chemicalDataSlice.reducer;
