import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type UIControlsType = {
  editMode: boolean;
  pointEditMode: boolean;
  showLoadTable: boolean;
};

const initialState: UIControlsType = {
  editMode: false,
  pointEditMode: false,
  showLoadTable: false,
};

const UIControlsSlice = createSlice({
  name: "UIControls",
  initialState,
  reducers: {
    setEdit: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },

    setPointEdit: (state, action: PayloadAction<boolean>) => {
      state.pointEditMode = action.payload;
    },

    setShowLoadTable: (state, action: PayloadAction<boolean>) => {
      state.showLoadTable = action.payload;
    },
  },
});

export const { setEdit, setPointEdit, setShowLoadTable } = UIControlsSlice.actions;

export const editState = (state: RootState) => state.UIControlsReducer.editMode;
export const pointEditState = (state: RootState) => state.UIControlsReducer.pointEditMode;
export const loadTableState = (state: RootState) => state.UIControlsReducer.showLoadTable;

export default UIControlsSlice.reducer;
