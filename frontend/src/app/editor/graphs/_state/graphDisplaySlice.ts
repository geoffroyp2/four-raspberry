import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { PointFilter } from "@app/_types/queryTypes";

type PointZoomType = Required<PointFilter>;

interface GraphDisplayType {
  route: "targets" | "records";
  loadPage: { record: number; target: number };
  loadAmount: number;
  pageAmount: { record: number; target: number };
  loadId: { recordId: number | null; targetId: number | null };
  pointZoom: PointZoomType;
  redirect: "url" | "api" | null;
  // pieceDisplay: "list" | "grid";
}

const initialState: GraphDisplayType = {
  route: "records",
  loadPage: { record: 0, target: 0 },
  loadAmount: 15,
  pageAmount: { record: 0, target: 0 },
  loadId: { targetId: null, recordId: null },
  pointZoom: {
    start: 0,
    end: 2147483647,
    amount: 70,
  },
  redirect: null,
  // pieceDisplay: "list",
};

export const graphDisplaySlice = createSlice({
  name: "graphDisplay",
  initialState,
  reducers: {
    setGraphRoute: (state, action: PayloadAction<GraphDisplayType["route"]>) => {
      state.route = action.payload;
    },
    setGraphLoadPage: (state, action: PayloadAction<Partial<GraphDisplayType["loadPage"]>>) => {
      if (action.payload.record !== undefined) state.loadPage.record = action.payload.record;
      if (action.payload.target !== undefined) state.loadPage.target = action.payload.target;
    },
    setGraphTotalAmount: (state, action: PayloadAction<Partial<GraphDisplayType["pageAmount"]>>) => {
      if (action.payload.record !== undefined) state.pageAmount.record = Math.floor(action.payload.record / state.loadAmount);
      if (action.payload.target !== undefined) state.pageAmount.target = Math.floor(action.payload.target / state.loadAmount);
    },
    setGraphLoadId: (state, action: PayloadAction<Partial<GraphDisplayType["loadId"]>>) => {
      if (action.payload.recordId !== undefined) state.loadId.recordId = action.payload.recordId;
      if (action.payload.targetId !== undefined) state.loadId.targetId = action.payload.targetId;
    },
    setGraphPointZoom: (state, action: PayloadAction<Partial<PointZoomType>>) => {
      state.pointZoom = { ...state.pointZoom, ...action.payload };
    },
    setGraphRedirect: (state, action: PayloadAction<GraphDisplayType["redirect"]>) => {
      state.redirect = action.payload;
    },
    // setTargetPieceDisplay: (state, action: PayloadAction<"list" | "grid">) => {
    //   state.pieceDisplay = action.payload;
    // },
  },
});

export const {
  setGraphRoute,
  setGraphLoadPage,
  setGraphTotalAmount,
  setGraphLoadId,
  setGraphPointZoom,
  setGraphRedirect,
  // setTargetPieceDisplay,
} = graphDisplaySlice.actions;

export const selectGraphRoute = (state: RootState) => state.graphDisplay.route;
export const selectGraphLoadPage = (state: RootState) => state.graphDisplay.loadPage;
export const selectGraphLoadAmount = (state: RootState) => state.graphDisplay.loadAmount;
export const selectGraphPageAmount = (state: RootState) => state.graphDisplay.pageAmount;
export const selectGraphLoadId = (state: RootState) => state.graphDisplay.loadId;
export const selectGraphPointZoom = (state: RootState) => state.graphDisplay.pointZoom;
export const selectGraphRedirect = (state: RootState) => state.graphDisplay.redirect;
// export const selectTargetPieceDisplay = (state: RootState) => state.targetDisplay.pieceDisplay;

export default graphDisplaySlice.reducer;
