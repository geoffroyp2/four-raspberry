import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Color, Point, Record } from "@sharedTypes/dbModelTypes";

type RecordSliceType = {
  selected: Record;
  memo: Record;
};

const emptyRecord: Record = {
  _id: "default",
  name: "",
  description: "",
  reference: "",
  color: { r: 0, g: 0, b: 0, a: 1 },
  points: [],
  pieces: [],
  date: "",
  lastUpdated: "",
};

const initialState: RecordSliceType = {
  selected: emptyRecord,
  memo: emptyRecord,
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    // GENERAL
    loadRecord: (state, action: PayloadAction<Record | null>) => {
      state.selected = action.payload || emptyRecord;
      state.memo = action.payload || emptyRecord;
    },

    memorizeRecord: (state, action: PayloadAction<void>) => {
      state.memo = state.selected;
    },

    rollbackRecordChanges: (state, action: PayloadAction<void>) => {
      state.selected = state.memo;
    },

    // FIELD EDITS
    setRecordName: (state, action: PayloadAction<string>) => {
      state.selected.name = action.payload;
    },

    setRecordDescription: (state, action: PayloadAction<string>) => {
      state.selected.description = action.payload;
    },

    setRecordReference: (state, action: PayloadAction<string>) => {
      state.selected.reference = action.payload;
    },

    setRecordColor: (state, action: PayloadAction<Color>) => {
      state.selected.color = action.payload;
    },

    setRecordDate: (state, action: PayloadAction<string>) => {
      state.selected.date = action.payload;
    },

    //PIECES
    setRecordPieces: (state, action: PayloadAction<string[]>) => {
      state.selected.pieces = action.payload;
    },

    addRecordPiece: (state, action: PayloadAction<string>) => {
      state.selected.pieces.push(action.payload);
    },

    deleteRecordPiece: (state, action: PayloadAction<string>) => {
      // remove 1 element at the index specified
      state.selected.pieces.splice(state.selected.pieces.indexOf(action.payload), 1);
    },

    //POINTS
    setRecordAllPoints: (state, action: PayloadAction<Point[]>) => {
      state.selected.points = action.payload;
    },

    setRecordOnePoint: (state, action: PayloadAction<{ idx: number; point: Point }>) => {
      state.selected.points[action.payload.idx] = action.payload.point;
    },

    setRecordPointHour: (state, action: PayloadAction<{ idx: number; val: number }>) => {
      const point = state.selected.points[action.payload.idx];
      const prevHours = Math.floor(point.x / (60 * 60 * 1000)) % 24;
      point.x = point.x + (action.payload.val - prevHours) * 60 * 60 * 1000;
    },

    setRecordPointMinute: (state, action: PayloadAction<{ idx: number; val: number }>) => {
      const point = state.selected.points[action.payload.idx];
      const prevMinutes = Math.floor(point.x / (60 * 1000)) % 60;
      point.x = point.x + (action.payload.val - prevMinutes) * 60 * 1000;
    },

    deleteRecordPoint: (state, action: PayloadAction<number>) => {
      state.selected.points.splice(action.payload, 1).sort((a, b) => a.x - b.x);
    },

    addRecordNewPoint: (state, action: PayloadAction<void>) => {
      state.selected.points.push({ x: 0, y: 0 });
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

export const CurrentRecord = (state: RootState) => state.record.selected;
export const CurrentRecordID = (state: RootState) => state.record.selected._id;
export const CurrentRecordName = (state: RootState) => state.record.selected.name;
export const CurrentRecordDescription = (state: RootState) => state.record.selected.description;
export const CurrentRecordReference = (state: RootState) => state.record.selected.reference;
export const CurrentRecordColor = (state: RootState) => state.record.selected.color;
export const CurrentRecordDate = (state: RootState) => state.record.selected.date;
export const CurrentRecordPieces = (state: RootState) => state.record.selected.pieces;
export const CurrentRecordPoints = (state: RootState) => state.record.selected.points;
export const CurrentRecordLastUpdate = (state: RootState) => state.record.selected.lastUpdated;

export default recordSlice.reducer;
