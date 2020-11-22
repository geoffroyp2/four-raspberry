import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Graph } from "../../../../interfaces/Igraph";
import { Color, Point } from "../../../../interfaces/programInterfaces";
import { RootState } from "../../store";

type GraphStateType = {
  select: string;
  graphs: {
    [id: string]: Graph;
  };
};

const initialState: GraphStateType = {
  select: "",
  graphs: {},
};

export const graphListSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    initGraphs: (state, action: PayloadAction<Graph[]>) => {
      action.payload.forEach((g) => {
        state.graphs[g._id] = g;
      });
      state.select = action.payload[0]._id;
    },

    addGraph: (state, action: PayloadAction<Graph>) => {
      state.graphs[action.payload._id] = action.payload;
    },

    deleteGraph: (state) => {
      delete state.graphs[state.select];
    },

    selectGraph: (state, action: PayloadAction<string>) => {
      if (state.graphs[action.payload]) state.select = action.payload;
    },

    updateGraph: (state, action: PayloadAction<Graph>) => {
      state.graphs[action.payload._id] = action.payload;
    },

    setId: (state, action: PayloadAction<string>) => {
      state.graphs[state.select]._id = action.payload;
    },

    setType: (state, action: PayloadAction<boolean>) => {
      state.graphs[state.select].graphType = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state.graphs[state.select].name = action.payload;
    },

    setDescription: (state, action: PayloadAction<string>) => {
      state.graphs[state.select].description = action.payload;
    },

    setColor: (state, action: PayloadAction<Color>) => {
      state.graphs[state.select].color = action.payload;
    },

    setPoints: (state, action: PayloadAction<Point[]>) => {
      state.graphs[state.select].points = action.payload;
    },

    setPoint: (state, action: PayloadAction<{ idx: number; nPoint: Point }>) => {
      state.graphs[state.select].points[action.payload.idx] = action.payload.nPoint;
      state.graphs[state.select].points.sort((a, b) => a.x - b.x);
    },

    deletePoint: (state, action: PayloadAction<number>) => {
      state.graphs[state.select].points.splice(action.payload, 1).sort((a, b) => a.x - b.x);
    },

    addNewPoint: (state, action: PayloadAction<void>) => {
      state.graphs[state.select].points.push({ x: 0, y: 0 });
      state.graphs[state.select].points.sort((a, b) => a.x - b.x);
    },
  },
});

export const {
  initGraphs,
  addGraph,
  deleteGraph,
  selectGraph,
  updateGraph,
  setId,
  setType,
  setName,
  setDescription,
  setColor,
  setPoints,
  setPoint,
  deletePoint,
  addNewPoint,
} = graphListSlice.actions;

export const allGraphs = (state: RootState) => state.graphListReducer.graphs;
export const selectedGraph = (state: RootState) => state.graphListReducer.graphs[state.graphListReducer.select];
export const selectedGraphId = (state: RootState) => state.graphListReducer.graphs[state.graphListReducer.select]._id;
export const selectedGraphName = (state: RootState) => state.graphListReducer.graphs[state.graphListReducer.select].name;
export const selectedGraphDescription = (state: RootState) =>
  state.graphListReducer.graphs[state.graphListReducer.select].description;
export const selectedGraphColor = (state: RootState) => state.graphListReducer.graphs[state.graphListReducer.select].color;
export const selectedGraphDate = (state: RootState) => state.graphListReducer.graphs[state.graphListReducer.select].date;
export const selectedGraphLastUpdate = (state: RootState) =>
  state.graphListReducer.graphs[state.graphListReducer.select].lastUpdated;
export const selectedGraphPoints = (state: RootState) => state.graphListReducer.graphs[state.graphListReducer.select].points;

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
