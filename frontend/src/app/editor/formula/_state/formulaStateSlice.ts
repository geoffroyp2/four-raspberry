import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface Pending {
  data: boolean;
  name: boolean;
  chemicalName: boolean;
  description: boolean;
}

interface Edit {
  name: boolean;
  chemicalName: boolean;
  description: boolean;
}

interface FormulaStateType {
  pending: Pending;
  edit: Edit;
}

const initialState: FormulaStateType = {
  pending: {
    data: false,
    name: false,
    chemicalName: false,
    description: false,
  },
  edit: {
    name: false,
    chemicalName: false,
    description: false,
  },
};

export const formulaStateSlice = createSlice({
  name: "formulaState",
  initialState,
  reducers: {
    setFormulaPending: (state, action: PayloadAction<Partial<Pending>>) => {
      Object.entries(action.payload).forEach((e) => {
        const [key, value] = e;
        state.pending[key as keyof Pending] = value!;
      });
    },
    setFormulaEdit: (state, action: PayloadAction<Partial<Edit>>) => {
      // Only one edit at a time
      Object.entries(state.edit).forEach(([key]) => {
        state.edit[key as keyof Edit] = false;
      });
      state.edit = { ...state.edit, ...action.payload };
    },
  },
});

export const { setFormulaPending, setFormulaEdit } = formulaStateSlice.actions;

export const selectFormulaPending = (state: RootState) => state.formulaState.pending;
export const selectFormulaEdit = (state: RootState) => state.formulaState.edit;

export default formulaStateSlice.reducer;
