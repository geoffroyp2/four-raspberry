import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color, Point, Reference } from "@sharedTypes/dbModelTypes";
import { RootState } from "../../store";

type ReferenceSliceType = {
  selected: Reference;
  memo: Reference; // To be able to roll back changes
};

export const emptyReference: Reference = {
  _id: "default",
  name: "",
  description: "",
  color: { r: 0, g: 0, b: 0, a: 1 },
  points: [],
  records: [],
  lastUpdated: "",
};

const initialState: ReferenceSliceType = {
  selected: emptyReference,
  memo: emptyReference,
};

const referenceSlice = createSlice({
  name: "reference",
  initialState,
  reducers: {
    // GENERAL
    loadReference: (state, action: PayloadAction<Reference | null>) => {
      state.selected = action.payload || emptyReference;
    },

    memorizeReference: (state, action: PayloadAction<void>) => {
      state.memo = state.selected;
    },

    rollbackReferenceChanges: (state, action: PayloadAction<void>) => {
      state.selected = state.memo;
    },

    // FIELD EDITS
    setReferenceName: (state, action: PayloadAction<string>) => {
      state.selected.name = action.payload;
    },

    setReferenceDescription: (state, action: PayloadAction<string>) => {
      state.selected.description = action.payload;
    },

    setReferenceColor: (state, action: PayloadAction<Color>) => {
      state.selected.color = action.payload;
    },

    //RECORDS
    setReferenceRecords: (state, action: PayloadAction<string[]>) => {
      state.selected.records = action.payload;
    },

    addReferenceRecord: (state, action: PayloadAction<string>) => {
      state.selected.records.push(action.payload);
    },

    deleteReferenceRecord: (state, action: PayloadAction<string>) => {
      // remove 1 element at the index specified
      state.selected.records.splice(state.selected.records.indexOf(action.payload), 1);
    },

    // POINTS
    setReferenceAllPoints: (state, action: PayloadAction<Point[]>) => {
      state.selected.points = action.payload;
    },

    setReferenceOnePoint: (state, action: PayloadAction<{ idx: number; point: Point }>) => {
      state.selected.points[action.payload.idx] = action.payload.point;
    },

    setReferencePointHour: (state, action: PayloadAction<{ idx: number; val: number }>) => {
      const point = state.selected.points[action.payload.idx];
      const prevHours = Math.floor(point.x / (60 * 60 * 1000)) % 24;
      point.x = point.x + (action.payload.val - prevHours) * 60 * 60 * 1000;
    },

    setReferencePointMinute: (state, action: PayloadAction<{ idx: number; val: number }>) => {
      const point = state.selected.points[action.payload.idx];
      const prevMinutes = Math.floor(point.x / (60 * 1000)) % 60;
      point.x = point.x + (action.payload.val - prevMinutes) * 60 * 1000;
    },

    deleteReferencePoint: (state, action: PayloadAction<number>) => {
      state.selected.points.splice(action.payload, 1).sort((a, b) => a.x - b.x);
    },

    addReferenceNewPoint: (state, action: PayloadAction<void>) => {
      state.selected.points.push({ x: 0, y: 0 });
    },
  },
});

export const {
  loadReference,
  memorizeReference,
  rollbackReferenceChanges,

  setReferenceName,
  setReferenceDescription,
  setReferenceColor,

  setReferenceRecords,
  addReferenceRecord,
  deleteReferenceRecord,

  setReferenceAllPoints,
  setReferenceOnePoint,
  setReferencePointHour,
  setReferencePointMinute,
  deleteReferencePoint,
  addReferenceNewPoint,
} = referenceSlice.actions;

export const CurrentReference = (state: RootState) => state.reference.selected;
export const CurrentReferenceID = (state: RootState) => state.reference.selected._id;
export const CurrentReferenceName = (state: RootState) => state.reference.selected.name;
export const CurrentReferenceDescription = (state: RootState) => state.reference.selected.description;
export const CurrentReferenceColor = (state: RootState) => state.reference.selected.color;
export const CurrentReferenceRecords = (state: RootState) => state.reference.selected.records;
export const CurrentReferencePoints = (state: RootState) => state.reference.selected.points;
export const CurrentReferenceLastUpdate = (state: RootState) => state.reference.selected.lastUpdated;

export default referenceSlice.reducer;
