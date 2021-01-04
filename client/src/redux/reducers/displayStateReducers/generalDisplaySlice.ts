import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@src/redux/store";

export type LoadTableSortType = "name" | "date" | "lastUpdated" | "reference" | "record" | "piece";
export type LoadTableContentType = "Record" | "Reference" | "Piece" | "Formula";
export type TabIDType = "Run" | "Reference" | "Record" | "Piece" | "Formula";

export type GeneralDisplayType = {
  currentTab: TabIDType;
  loadTable: {
    show: boolean;
    content: LoadTableContentType;
    rowSelected: string;
    sort: {
      param: LoadTableSortType;
      direction: boolean;
    };
  };
};

const initialState: GeneralDisplayType = {
  currentTab: "Piece",
  loadTable: {
    show: false,
    content: "Reference",
    rowSelected: "",
    sort: {
      param: "name",
      direction: true,
    },
  },
};

const generalDisplaySlice = createSlice({
  name: "generalDisplay",
  initialState,

  reducers: {
    setCurrentTab: (state, action: PayloadAction<GeneralDisplayType["currentTab"]>) => {
      state.loadTable.show = false;
      state.loadTable.sort = { param: "name", direction: true }; // Maybe not ?
      state.currentTab = action.payload;
    },

    // LoadTable
    setLoadTableShow: (state, action: PayloadAction<boolean>) => {
      state.loadTable.show = action.payload;
    },

    setLoadTableContent: (state, action: PayloadAction<GeneralDisplayType["loadTable"]["content"]>) => {
      state.loadTable.content = action.payload;
    },

    setLoadTableRowSelected: (state, action: PayloadAction<string>) => {
      state.loadTable.rowSelected = action.payload;
    },

    setLoadTableSort: (state, action: PayloadAction<{ param: LoadTableSortType; direction: boolean }>) => {
      state.loadTable.sort = action.payload;
    },
  },
});

export const {
  setCurrentTab,
  setLoadTableShow,
  setLoadTableContent,
  setLoadTableRowSelected,
  setLoadTableSort,
} = generalDisplaySlice.actions;

export const CurrentTab = (state: RootState) => state.generalDisplay.currentTab;
export const LoadTableShow = (state: RootState) => state.generalDisplay.loadTable.show;
export const LoadTableContent = (state: RootState) => state.generalDisplay.loadTable.content;
export const LoadTableRowSelected = (state: RootState) => state.generalDisplay.loadTable.rowSelected;
export const LoadTableSort = (state: RootState) => state.generalDisplay.loadTable.sort;

export default generalDisplaySlice.reducer;
