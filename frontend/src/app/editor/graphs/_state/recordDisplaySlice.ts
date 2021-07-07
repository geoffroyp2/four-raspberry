import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { PointFilter } from "@app/_types/queryTypes";

type PointZoomType = Required<PointFilter>;

interface RecordDisplayType {
  loadPage: number;
  loadAmount: number;
  pageAmount: number;
  mainLoadId: number | null;
  previewLoadId: number | null;
  pointZoom: PointZoomType;
  nameSearch: string | null;
  sortParam: "name" | "id" | "createdAt" | "updatedAt" | "oven" | "target";
  sortDirection: "ASC" | "DESC";
}

const initialState: RecordDisplayType = {
  loadPage: 0,
  loadAmount: 15,
  pageAmount: 0,
  mainLoadId: null,
  previewLoadId: null,
  pointZoom: {
    start: 0,
    end: 2147483647,
    amount: 70,
  },
  nameSearch: null,
  sortParam: "id",
  sortDirection: "ASC",
};

export const recordDisplaySlice = createSlice({
  name: "recordDisplay",
  initialState,
  reducers: {
    setRecordLoadPage: (state, action: PayloadAction<number>) => {
      state.loadPage = action.payload;
    },
    setRecordTotalAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = Math.floor((action.payload - 1) / state.loadAmount);
    },
    setRecordMainLoadId: (state, action: PayloadAction<number>) => {
      state.mainLoadId = action.payload;
    },
    setRecordPreviewLoadId: (state, action: PayloadAction<number>) => {
      state.previewLoadId = action.payload;
    },
    setRecordPointZoom: (state, action: PayloadAction<Partial<PointZoomType>>) => {
      state.pointZoom = { ...state.pointZoom, ...action.payload };
    },
    setRecordNameSearch: (state, action: PayloadAction<string | null>) => {
      state.nameSearch = action.payload;
    },
    setRecordSortParam: (state, action: PayloadAction<RecordDisplayType["sortParam"]>) => {
      state.sortParam = action.payload;
    },
    setRecordSortDirection: (state, action: PayloadAction<RecordDisplayType["sortDirection"]>) => {
      state.sortDirection = action.payload;
    },
  },
});

export const {
  setRecordLoadPage,
  setRecordTotalAmount,
  setRecordMainLoadId,
  setRecordPreviewLoadId,
  setRecordPointZoom,
  setRecordNameSearch,
  setRecordSortParam,
  setRecordSortDirection,
} = recordDisplaySlice.actions;

export const selectRecordLoadPage = (state: RootState) => state.recordDisplay.loadPage;
export const selectRecordLoadAmount = (state: RootState) => state.recordDisplay.loadAmount;
export const selectRecordPageAmount = (state: RootState) => state.recordDisplay.pageAmount;
export const selectRecordMainLoadId = (state: RootState) => state.recordDisplay.mainLoadId;
export const selectRecordPreviewLoadId = (state: RootState) => state.recordDisplay.previewLoadId;
export const selectRecordPointZoom = (state: RootState) => state.recordDisplay.pointZoom;
export const selectRecordNameSearch = (state: RootState) => state.recordDisplay.nameSearch;
export const selectRecordSortParam = (state: RootState) => state.recordDisplay.sortParam;
export const selectRecordSortDirection = (state: RootState) => state.recordDisplay.sortDirection;

export default recordDisplaySlice.reducer;
