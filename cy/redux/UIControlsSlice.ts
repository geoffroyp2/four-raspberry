import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GraphEditFilter } from "./cy/network/db/types/postTypes";
import { RootState } from "../store";

export type TableSortType = "name" | "date" | "lastUpdated" | "type" | "ref";

type UIControlsType = {
  screenSelect: "browse" | "run";
  programStart: boolean;
  editMode: boolean;
  pointEditMode: boolean;
  showLoadTable: boolean;
  rowSelected: string;
  tableSort: {
    sortParam: TableSortType;
    sortDirection: boolean; // True = ascending
  };
  tableProps: {
    setRef: boolean;
    filter?: GraphEditFilter["filter"];
  };
};

const initialState: UIControlsType = {
  screenSelect: "browse",
  programStart: false,
  editMode: false,
  pointEditMode: false,
  showLoadTable: false,
  rowSelected: "",
  tableSort: {
    sortParam: "name",
    sortDirection: true,
  },
  tableProps: {
    setRef: false,
  },
};

const UIControlsSlice = createSlice({
  name: "UIControls",
  initialState,
  reducers: {
    setProgramStart: (state, action: PayloadAction<boolean>) => {
      state.programStart = action.payload;
    },

    setScreenSelect: (state, action: PayloadAction<UIControlsType["screenSelect"]>) => {
      state.screenSelect = action.payload;
    },

    setLoadTableProps: (state, action: PayloadAction<{ setRef: boolean; filter?: GraphEditFilter["filter"] }>) => {
      state.tableProps = action.payload;
    },

    setRowSelected: (state, action: PayloadAction<string>) => {
      state.rowSelected = action.payload;
    },

    setTableSort: (state, action: PayloadAction<{ sortParam: TableSortType; sortDirection: boolean }>) => {
      state.tableSort = action.payload;
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

export const {
  setProgramStart,
  setScreenSelect,
  setEdit,
  setPointEdit,
  setRowSelected,
  setTableSort,
  setShowLoadTable,
  setLoadTableProps,
} = UIControlsSlice.actions;

export const screenSelect = (state: RootState) => state.UIControlsReducer.screenSelect;
export const programStart = (state: RootState) => state.UIControlsReducer.programStart;
export const editState = (state: RootState) => state.UIControlsReducer.editMode;
export const pointEditState = (state: RootState) => state.UIControlsReducer.pointEditMode;
export const loadTableState = (state: RootState) => state.UIControlsReducer.showLoadTable;
export const loadTableProps = (state: RootState) => state.UIControlsReducer.tableProps;
export const loadTableSort = (state: RootState) => state.UIControlsReducer.tableSort;
export const loadTableRowSelected = (state: RootState) => state.UIControlsReducer.rowSelected;

export default UIControlsSlice.reducer;
