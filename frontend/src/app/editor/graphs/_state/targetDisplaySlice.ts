import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { PointFilter } from "@app/_types/queryTypes";

type PointZoomType = Required<PointFilter>;

interface TargetDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  loadId: number | null;
  pointZoom: PointZoomType;
  nameSearch: string | null;
  sortParam: "name" | "id" | "createdAt" | "updatedAt" | "oven";
  sortDirection: "ASC" | "DESC";
}

const initialState: TargetDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  loadId: null,
  pointZoom: {
    start: 0,
    end: 2147483647,
    amount: 70,
  },
  nameSearch: null,
  sortParam: "id",
  sortDirection: "ASC",
};

export const targetDisplaySlice = createSlice({
  name: "targetDisplay",
  initialState,
  reducers: {
    setTargetLoadPage: (state, action: PayloadAction<number>) => {
      state.loadPage = action.payload;
    },
    setTargetTotalAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = Math.floor((action.payload - 1) / state.loadAmount);
    },
    setTargetLoadId: (state, action: PayloadAction<number>) => {
      state.loadId = action.payload;
    },
    setTargetPointZoom: (state, action: PayloadAction<Partial<PointZoomType>>) => {
      state.pointZoom = { ...state.pointZoom, ...action.payload };
    },
    setTargetNameSearch: (state, action: PayloadAction<string | null>) => {
      state.nameSearch = action.payload;
    },
    setTargetSortParam: (state, action: PayloadAction<TargetDisplayType["sortParam"]>) => {
      state.sortParam = action.payload;
    },
    setTargetSortDirection: (state, action: PayloadAction<TargetDisplayType["sortDirection"]>) => {
      state.sortDirection = action.payload;
    },
  },
});

export const {
  setTargetLoadPage,
  setTargetTotalAmount,
  setTargetLoadId,
  setTargetPointZoom,
  setTargetNameSearch,
  setTargetSortParam,
  setTargetSortDirection,
} = targetDisplaySlice.actions;

export const selectTargetLoadPage = (state: RootState) => state.targetDisplay.loadPage;
export const selectTargetLoadAmount = (state: RootState) => state.targetDisplay.loadAmount;
export const selectTargetPageAmount = (state: RootState) => state.targetDisplay.pageAmount;
export const selectTargetLoadId = (state: RootState) => state.targetDisplay.loadId;
export const selectTargetPointZoom = (state: RootState) => state.targetDisplay.pointZoom;
export const selectTargetNameSearch = (state: RootState) => state.targetDisplay.nameSearch;
export const selectTargetSortParam = (state: RootState) => state.targetDisplay.sortParam;
export const selectTargetSortDirection = (state: RootState) => state.targetDisplay.sortDirection;

export default targetDisplaySlice.reducer;
