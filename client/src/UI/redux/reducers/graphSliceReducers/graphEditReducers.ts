import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { Color, Point } from "../../../../interfaces/programInterfaces";
import { GraphStateType } from "../graphSlice";

// Memorize selected graph before editing to be able to cancel changes
const memorizeGraph = (state: WritableDraft<GraphStateType>, action: PayloadAction<void>) => {
  state.graphMemo = state.selected;
};

const rollbackChanges = (state: WritableDraft<GraphStateType>, action: PayloadAction<void>) => {
  state.selected = state.graphMemo;
};

// individual fields modifications
const setType = (state: WritableDraft<GraphStateType>, action: PayloadAction<boolean>) => {
  state.selected.graphType = action.payload;
};

const setName = (state: WritableDraft<GraphStateType>, action: PayloadAction<string>) => {
  state.selected.name = action.payload;
};

const setDescription = (state: WritableDraft<GraphStateType>, action: PayloadAction<string>) => {
  state.selected.description = action.payload;
};

const setColor = (state: WritableDraft<GraphStateType>, action: PayloadAction<Color>) => {
  state.selected.color = action.payload;
};

const setReference = (state: WritableDraft<GraphStateType>, action: PayloadAction<string>) => {
  state.selected.graphRef = action.payload;
};

const setDate = (state: WritableDraft<GraphStateType>, action: PayloadAction<string>) => {
  state.selected.date = action.payload;
};

const setPoints = (state: WritableDraft<GraphStateType>, action: PayloadAction<Point[]>) => {
  state.selected.points = action.payload;
};

const setPoint = (state: WritableDraft<GraphStateType>, action: PayloadAction<{ idx: number; nPoint: Point }>) => {
  state.selected.points[action.payload.idx] = action.payload.nPoint;
};

const setPointHour = (state: WritableDraft<GraphStateType>, action: PayloadAction<{ idx: number; val: number }>) => {
  const point = state.selected.points[action.payload.idx];
  const prevHours = Math.floor(point.x / (60 * 60 * 1000)) % 24;
  point.x = point.x + (action.payload.val - prevHours) * 60 * 60 * 1000;
};

const setPointMinute = (state: WritableDraft<GraphStateType>, action: PayloadAction<{ idx: number; val: number }>) => {
  const point = state.selected.points[action.payload.idx];
  const prevMinutes = Math.floor(point.x / (60 * 1000)) % 60;
  point.x = point.x + (action.payload.val - prevMinutes) * 60 * 1000;
};

const deletePoint = (state: WritableDraft<GraphStateType>, action: PayloadAction<number>) => {
  state.selected.points.splice(action.payload, 1).sort((a, b) => a.x - b.x);
};

const addNewPoint = (state: WritableDraft<GraphStateType>, action: PayloadAction<void>) => {
  state.selected.points.push({ x: 0, y: 0 });
};

export const graphEditReducers = {
  memorizeGraph,
  rollbackChanges,
  setType,
  setName,
  setDescription,
  setColor,
  setReference,
  setDate,
  setPoints,
  setPoint,
  setPointHour,
  setPointMinute,
  deletePoint,
  addNewPoint,
};
