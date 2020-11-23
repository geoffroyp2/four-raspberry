import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { Graph } from "../../../../interfaces/Igraph";
import { GraphStateType } from "../graphSlice";

const initGraphs = (state: WritableDraft<GraphStateType>, action: PayloadAction<Graph[]>) => {
  action.payload.forEach((g) => {
    state.graphs[g._id] = g;
  });
  state.selected = action.payload[0];
};

const addGraph = (state: WritableDraft<GraphStateType>, action: PayloadAction<Graph>) => {
  state.graphs[action.payload._id] = action.payload;
  state.selected = action.payload;
};

const deleteSelectedGraph = (state: WritableDraft<GraphStateType>, action: PayloadAction<void>) => {
  delete state.graphs[state.selected._id];
  state.selected = Object.values(state.graphs)[0];
};

const selectGraph = (state: WritableDraft<GraphStateType>, action: PayloadAction<string>) => {
  if (state.graphs[action.payload]) state.selected = state.graphs[action.payload];
};

const updateGraph = (state: WritableDraft<GraphStateType>, action: PayloadAction<Graph>) => {
  state.graphs[action.payload._id] = action.payload;
  state.selected = action.payload;
};

export const graphListReducers = { initGraphs, addGraph, deleteSelectedGraph, selectGraph, updateGraph };
