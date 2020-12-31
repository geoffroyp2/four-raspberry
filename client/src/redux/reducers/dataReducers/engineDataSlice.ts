import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reference } from "@sharedTypes/dbModelTypes";
import { EngineState, emptyValuesType, GraphType } from "@sharedTypes/engineTypes";
import { RootState } from "../../store";
import { emptyReference } from "./referenceSlice";

type engineDataType = {
  engineState: EngineState;
  reference: Reference;
  graphs: GraphType[];
};

const initialState: engineDataType = {
  engineState: {
    values: emptyValuesType,
    status: "stop",
    refID: "default",
    times: {
      start: 0,
      totalRun: 0,
      totalPause: 0,
    },
  },
  reference: emptyReference,
  graphs: [],
};

const engineDataSlice = createSlice({
  name: "dbData",
  initialState,
  reducers: {
    updateEngineState: (state, action: PayloadAction<EngineState | null>) => {
      if (action.payload) {
        state.engineState = action.payload;
      }
    },
    updateEngineReference: (state, action: PayloadAction<Reference | "default">) => {
      state.reference = action.payload === "default" ? emptyReference : action.payload;
    },
    updateGraphs: (state, action: PayloadAction<GraphType[] | null>) => {
      if (action.payload) state.graphs = action.payload;
    },
  },
});

export const { updateEngineState, updateEngineReference, updateGraphs } = engineDataSlice.actions;

export const engineState = (state: RootState) => state.engineData.engineState;
export const engineReference = (state: RootState) => state.engineData.reference;
export const engineGraphs = (state: RootState) => state.engineData.graphs;

export const engineReferencePoints = (state: RootState) => state.engineData.reference.points;
export const engineReferenceColor = (state: RootState) => state.engineData.reference.color;

export default engineDataSlice.reducer;
