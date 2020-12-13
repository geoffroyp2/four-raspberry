import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color, Point, Reference } from "@sharedTypes/dbModelTypes";
import { RootState } from "../store";

type ReferenceSliceType = {
  selected: Reference | null;
  memo: Reference | null; // To be able to roll back changes
};

const initialState: ReferenceSliceType = {
  selected: null,
  memo: null,
};

const referenceSlice = createSlice({
  name: "reference",
  initialState,
  reducers: {
    // GENERAL
    loadReference: (state, action: PayloadAction<Reference>) => {
      state.selected = action.payload;
    },

    memorizeReference: (state, action: PayloadAction<void>) => {
      state.memo = state.selected;
    },

    rollbackReferenceChanges: (state, action: PayloadAction<void>) => {
      state.selected = state.memo;
    },

    // FIELD EDITS
    setReferenceName: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.name = action.payload;
    },

    setReferenceDescription: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.description = action.payload;
    },

    setReferenceColor: (state, action: PayloadAction<Color>) => {
      if (state.selected) state.selected.color = action.payload;
    },

    //RECORDS
    setReferenceRecords: (state, action: PayloadAction<string[]>) => {
      if (state.selected) state.selected.records = action.payload;
    },

    addReferenceRecord: (state, action: PayloadAction<string>) => {
      if (state.selected) state.selected.records.push(action.payload);
    },

    deleteReferenceRecord: (state, action: PayloadAction<string>) => {
      // remove 1 element at the index specified
      if (state.selected) state.selected.records.splice(state.selected.records.indexOf(action.payload), 1);
    },

    // POINTS
    setReferenceAllPoints: (state, action: PayloadAction<Point[]>) => {
      if (state.selected) state.selected.points = action.payload;
    },

    setReferenceOnePoint: (state, action: PayloadAction<{ idx: number; point: Point }>) => {
      if (state.selected) state.selected.points[action.payload.idx] = action.payload.point;
    },

    setReferencePointHour: (state, action: PayloadAction<{ idx: number; val: number }>) => {
      if (state.selected) {
        const point = state.selected.points[action.payload.idx];
        const prevHours = Math.floor(point.x / (60 * 60 * 1000)) % 24;
        point.x = point.x + (action.payload.val - prevHours) * 60 * 60 * 1000;
      }
    },

    setReferencePointMinute: (state, action: PayloadAction<{ idx: number; val: number }>) => {
      if (state.selected) {
        const point = state.selected.points[action.payload.idx];
        const prevMinutes = Math.floor(point.x / (60 * 1000)) % 60;
        point.x = point.x + (action.payload.val - prevMinutes) * 60 * 1000;
      }
    },

    deleteReferencePoint: (state, action: PayloadAction<number>) => {
      if (state.selected) state.selected.points.splice(action.payload, 1).sort((a, b) => a.x - b.x);
    },

    addReferenceNewPoint: (state, action: PayloadAction<void>) => {
      if (state.selected) state.selected.points.push({ x: 0, y: 0 });
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

export const reference = (state: RootState) => state.referenceReducer.selected;
export const referenceID = (state: RootState) => state.referenceReducer.selected!._id;
export const referenceName = (state: RootState) => state.referenceReducer.selected!.name;
export const referenceDescription = (state: RootState) => state.referenceReducer.selected!.description;
export const referenceColor = (state: RootState) => state.referenceReducer.selected!.color;
export const referenceRecords = (state: RootState) => state.referenceReducer.selected!.records;
export const referencePoints = (state: RootState) => state.referenceReducer.selected!.points;

export default referenceSlice.reducer;
