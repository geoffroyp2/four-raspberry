import { createSlice } from "@reduxjs/toolkit";
import { Graph } from "@clientTypes/Graph";
import { RootState } from "../../store";

import { graphListReducers } from "./graphSliceReducers/graphListReducers";
import { graphEditReducers } from "./graphSliceReducers/graphEditReducers";

export type GraphStateType = {
  selected: Graph;
  graphMemo: Graph;
  graphs: {
    [id: string]: Graph;
  };
};

export const emptyGraph: Graph = {
  _id: "",
  name: "",
  description: "",
  graphType: true,
  graphRef: "",
  points: [],
  pieces: [],
  color: { r: 0, g: 0, b: 0 },
  date: "",
};

const initialState: GraphStateType = {
  selected: emptyGraph,
  graphMemo: emptyGraph,
  graphs: {},
};

export const graphListSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    ...graphListReducers,
    ...graphEditReducers,
  },
});

export const {
  initGraphs,
  addGraph,
  deleteSelectedGraph,
  selectGraph,
  updateGraph,
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
} = graphListSlice.actions;

export const allGraphs = (state: RootState) => state.graphListReducer.graphs;
export const selectedGraph = (state: RootState) => state.graphListReducer.selected;
export const selectedGraphId = (state: RootState) => state.graphListReducer.selected._id;
export const selectedGraphName = (state: RootState) => state.graphListReducer.selected.name;
export const selectedGraphDescription = (state: RootState) => state.graphListReducer.selected.description;
export const selectedGraphType = (state: RootState) => state.graphListReducer.selected.graphType;
export const selectedGraphColor = (state: RootState) => state.graphListReducer.selected.color;
export const selectedGraphReference = (state: RootState) =>
  state.graphListReducer.graphs[state.graphListReducer.selected.graphRef];
export const selectedGraphDate = (state: RootState) => state.graphListReducer.selected.date;
export const selectedGraphLastUpdate = (state: RootState) => state.graphListReducer.selected.lastUpdated;
export const selectedGraphPoints = (state: RootState) => state.graphListReducer.selected.points;

export default graphListSlice.reducer;

/*
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;
*/
