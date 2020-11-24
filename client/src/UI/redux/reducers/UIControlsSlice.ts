import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GraphEditFilter } from "../../../db/graphQueryFormat";
import { RootState } from "../store";

type UIControlsType = {
  displaySize: boolean;
  editMode: boolean;
  pointEditMode: boolean;
  showLoadTable: boolean;
  tableProps: {
    setRef: boolean;
    filter?: GraphEditFilter;
  };
};

const initialState: UIControlsType = {
  displaySize: true,
  editMode: false,
  pointEditMode: false,
  showLoadTable: false,
  tableProps: {
    setRef: false,
  },
};

const UIControlsSlice = createSlice({
  name: "UIControls",
  initialState,
  reducers: {
    setDisplaySize: (state, action: PayloadAction<boolean>) => {
      state.displaySize = action.payload;
    },

    setLoadTableProps: (state, action: PayloadAction<{ setRef: boolean; filter?: GraphEditFilter }>) => {
      state.tableProps = action.payload;
    },

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

export const { setEdit, setPointEdit, setShowLoadTable, setDisplaySize, setLoadTableProps } = UIControlsSlice.actions;

export const displaySize = (state: RootState) => state.UIControlsReducer.displaySize;
export const editState = (state: RootState) => state.UIControlsReducer.editMode;
export const pointEditState = (state: RootState) => state.UIControlsReducer.pointEditMode;
export const loadTableState = (state: RootState) => state.UIControlsReducer.showLoadTable;
export const loadTableProps = (state: RootState) => state.UIControlsReducer.tableProps;

export default UIControlsSlice.reducer;
