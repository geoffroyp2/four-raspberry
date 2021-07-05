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
  },
});

export const { setTargetLoadPage, setTargetTotalAmount, setTargetLoadId, setTargetPointZoom } = targetDisplaySlice.actions;

export const selectTargetLoadPage = (state: RootState) => state.targetDisplay.loadPage;
export const selectTargetLoadAmount = (state: RootState) => state.targetDisplay.loadAmount;
export const selectTargetPageAmount = (state: RootState) => state.targetDisplay.pageAmount;
export const selectTargetLoadId = (state: RootState) => state.targetDisplay.loadId;
export const selectTargetPointZoom = (state: RootState) => state.targetDisplay.pointZoom;

export default targetDisplaySlice.reducer;
