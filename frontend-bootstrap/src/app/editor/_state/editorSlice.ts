import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface LoadTablesType {
  target: boolean;
  record: boolean;
  piece: boolean;
  formula: boolean;
  chemical: boolean;
}

interface EditorStateType {
  loadTables: LoadTablesType;
}

const initialState: EditorStateType = {
  loadTables: {
    target: false,
    record: false,
    piece: false,
    formula: false,
    chemical: false,
  },
};

export const editorStateSlice = createSlice({
  name: "editorState",
  initialState,
  reducers: {
    setLoadTable: (state, action: PayloadAction<Partial<LoadTablesType>>) => {
      // Only one loadTable at a time
      Object.entries(state.loadTables).forEach(([key]) => {
        state.loadTables[key as keyof LoadTablesType] = false;
      });
      state.loadTables = { ...state.loadTables, ...action.payload };
    },
  },
});

export const { setLoadTable } = editorStateSlice.actions;

export const selectLoadTables = (state: RootState) => state.editorState.loadTables;

export default editorStateSlice.reducer;
