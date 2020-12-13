import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Color, Point, Record } from "@sharedTypes/dbModelTypes";

type RecordSliceType = {
  selected: Record | null;
  memo: Record | null;
};

const initialState: RecordSliceType = {
  selected: null,
  memo: null,
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    // GENERAL
    loadRecord: (state, action: PayloadAction<Record>) => {
      state.selected = action.payload;
    },

    memorizeRecord: (state, action: PayloadAction<void>) => {
      state.memo = state.selected;
    },

    rollbackRecordChanges: (state, action: PayloadAction<void>) => {
      state.selected = state.memo;
    },

    // FIELD EDITS
    setRecordName: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.name = action.payload;
    },

    setRecordDescription: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.description = action.payload;
    },

    setRecordReference: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.reference = action.payload;
    },

    setRecordColor: (state, action: PayloadAction<Color>) => {
      if (state.selected) state.selected.color = action.payload;
    },

    setRecordDate: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.date = action.payload;
    },

    //PIECES
    setRecordPieces: (state, action: PayloadAction<string[]>) => {
      if (state.selected) state.selected.pieces = action.payload;
    },

    addRecordPiece: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.pieces.push(action.payload);
    },

    deleteRecordPiece: (state, action: PayloadAction<string>) => {
      // remove 1 element at the index specified
      if (state.selected) state.selected.pieces.splice(state.selected.pieces.indexOf(action.payload), 1);
    },

    //POINTS
    setRecordAllPoints: (state, action: PayloadAction<Point[]>) => {
      if (state.selected) state.selected.points = action.payload;
    },

    setRecordOnePoint: (state, action: PayloadAction<{ idx: number; point: Point }>) => {
      if (state.selected) state.selected.points[action.payload.idx] = action.payload.point;
    },

    setRecordPointHour: (state, action: PayloadAction<{ idx: number; val: number }>) => {
      if (state.selected) {
        const point = state.selected.points[action.payload.idx];
        const prevHours = Math.floor(point.x / (60 * 60 * 1000)) % 24;
        point.x = point.x + (action.payload.val - prevHours) * 60 * 60 * 1000;
      }
    },

    setRecordPointMinute: (state, action: PayloadAction<{ idx: number; val: number }>) => {
      if (state.selected) {
        const point = state.selected.points[action.payload.idx];
        const prevMinutes = Math.floor(point.x / (60 * 1000)) % 60;
        point.x = point.x + (action.payload.val - prevMinutes) * 60 * 1000;
      }
    },

    deleteRecordPoint: (state, action: PayloadAction<number>) => {
      if (state.selected) state.selected.points.splice(action.payload, 1).sort((a, b) => a.x - b.x);
    },

    addRecordNewPoint: (state, action: PayloadAction<void>) => {
      if (state.selected) state.selected.points.push({ x: 0, y: 0 });
    },
  },
});

export const {
  loadRecord,
  memorizeRecord,
  rollbackRecordChanges,

  setRecordName,
  setRecordDescription,
  setRecordReference,
  setRecordColor,
  setRecordDate,

  setRecordPieces,
  addRecordPiece,
  deleteRecordPiece,

  setRecordAllPoints,
  setRecordOnePoint,
  setRecordPointHour,
  setRecordPointMinute,
  deleteRecordPoint,
  addRecordNewPoint,
} = recordSlice.actions;

export const record = (state: RootState) => state.recordReducer.selected;
export const recordID = (state: RootState) => state.recordReducer.selected!._id;
export const recordName = (state: RootState) => state.recordReducer.selected!.name;
export const recordDescription = (state: RootState) => state.recordReducer.selected!.description;
export const recordReference = (state: RootState) => state.recordReducer.selected!.reference;
export const recordColor = (state: RootState) => state.recordReducer.selected!.color;
export const recordDate = (state: RootState) => state.recordReducer.selected!.date;
export const recordPieces = (state: RootState) => state.recordReducer.selected!.pieces;
export const recordPoints = (state: RootState) => state.recordReducer.selected!.points;

export default recordSlice.reducer;
