import { Graph } from "@clientTypes/Graph";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dbMemoType = {
  recordGraphs: { [id: string]: Graph };
  refGraphs: { [id: string]: Graph };
  // Pieces: { [id: string]: Piece };
  // Recipe: { [id: string]: Recipe };
};

const initialState: dbMemoType = {
  recordGraphs: {},
  refGraphs: {},
  // Pieces: {},
  // Recipe: {},
};

const dbMemoSlice = createSlice({
  name: "dbMemo",
  initialState,
  reducers: {
    loadGraphs: (state, action: PayloadAction<Graph[]>) => {
      action.payload.forEach((g) => {
        g.graphType ? (state.refGraphs[g._id] = g) : (state.recordGraphs[g._id] = g);
      });
    },

    updateRecordGraph: (state, action: PayloadAction<Graph>) => {
      state.recordGraphs[action.payload._id] = action.payload;
    },

    updateRefGraph: (state, action: PayloadAction<Graph>) => {
      state.refGraphs[action.payload._id] = action.payload;
    },
  },
});

export const { loadGraphs, updateRecordGraph, updateRefGraph } = dbMemoSlice.actions;

// export const recordGraphs =
// export const refGraphs =

export default dbMemoSlice.reducer;
