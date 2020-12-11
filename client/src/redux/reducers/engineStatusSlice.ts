import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyGraph } from "./graphSlice";
import { RootState } from "../store";

import { EngineStatus } from "@clientTypes/programInterfaces";
import { Graph } from "@clientTypes/Graph";

type EngineStatusType = {
  status: EngineStatus;
  runGraph: Graph;
  targetGraph: Graph;
};

const initialState: EngineStatusType = {
  status: {
    runStatus: "stop",
    driverMode: "auto",
    connected: true,
    targetGraphID: "",
    sensors: {
      temp: 20,
      oxy: 0.5,
    },
    target: {
      temp: 25,
      oxy: 0.8,
    },
    valves: {
      angle: 90,
    },
  },
  runGraph: emptyGraph,
  targetGraph: emptyGraph,
};

const EngineStatusSlice = createSlice({
  name: "EngineStatus",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<EngineStatus>) => {
      state.status = action.payload;
    },

    setRunGraph: (state, action: PayloadAction<Graph>) => {
      state.runGraph = action.payload;
    },

    setTargetGraph: (state, action: PayloadAction<Graph>) => {
      state.targetGraph = action.payload;
    },
  },
});

export const { setStatus, setRunGraph, setTargetGraph } = EngineStatusSlice.actions;

export const engineStatus = (state: RootState) => state.EngineStatusReducer.status;
export const runStatus = (state: RootState) => state.EngineStatusReducer.status.runStatus;
export const driverMode = (state: RootState) => state.EngineStatusReducer.status.driverMode;
export const raspConnected = (state: RootState) => state.EngineStatusReducer.status.connected;
export const sensorValues = (state: RootState) => state.EngineStatusReducer.status.sensors;
export const targetValues = (state: RootState) => state.EngineStatusReducer.status.target;
export const valveValues = (state: RootState) => state.EngineStatusReducer.status.valves;
export const runGraph = (state: RootState) => state.EngineStatusReducer.runGraph;
export const targetGraphID = (state: RootState) => state.EngineStatusReducer.status.targetGraphID;
export const targetGraph = (state: RootState) => state.EngineStatusReducer.targetGraph;

export default EngineStatusSlice.reducer;
