import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Graph } from "../../../../interfaces/Igraph";
import { Color, Point } from "../../../../interfaces/programInterfaces";
import { RootState } from "../../store";

type GraphStateType = {
  selected: Graph;
  graphs: {
    [id: string]: Graph;
  };
};

const initialState: GraphStateType = {
  selected: {
    _id: "",
    name: "",
    description: "",
    graphType: true,
    color: { r: 0, g: 0, b: 0, a: 0.9 },
    points: [],
    date: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  },
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
      state.selected = action.payload[0];
    },

    addGraph: (state, action: PayloadAction<Graph>) => {
      state.graphs[action.payload._id] = action.payload;
      state.selected = state.graphs[action.payload._id];
    },

    deleteSelectedGraph: (state, action: PayloadAction<void>) => {
      delete state.graphs[state.selected._id];
      state.selected = { ...Object.values(state.graphs)[0] };
    },

    selectGraph: (state, action: PayloadAction<string>) => {
      if (state.graphs[action.payload]) {
        state.graphs[state.selected._id] = state.selected;
        state.selected = state.graphs[action.payload];
      }
    },

    updateGraph: (state, action: PayloadAction<Graph>) => {
      state.graphs[action.payload._id] = action.payload;
    },

    setId: (state, action: PayloadAction<string>) => {
      state.selected._id = action.payload;
    },

    setType: (state, action: PayloadAction<boolean>) => {
      state.selected.graphType = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state.selected.name = action.payload;
    },

    setDescription: (state, action: PayloadAction<string>) => {
      state.selected.description = action.payload;
    },

    setColor: (state, action: PayloadAction<Color>) => {
      state.selected.color = action.payload;
    },

    setPoints: (state, action: PayloadAction<Point[]>) => {
      state.selected.points = action.payload;
    },

    setPoint: (state, action: PayloadAction<{ idx: number; nPoint: Point }>) => {
      state.selected.points[action.payload.idx] = action.payload.nPoint;
      state.selected.points.sort((a, b) => a.x - b.x);
    },

    deletePoint: (state, action: PayloadAction<number>) => {
      state.selected.points.splice(action.payload, 1).sort((a, b) => a.x - b.x);
    },

    addNewPoint: (state, action: PayloadAction<void>) => {
      state.selected.points.push({ x: 0, y: 0 });
      state.selected.points.sort((a, b) => a.x - b.x);
    },
  },
});

export const {
  initGraphs,
  addGraph,
  deleteSelectedGraph,
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
export const selectedGraph = (state: RootState) => state.graphListReducer.selected;
export const selectedGraphId = (state: RootState) => state.graphListReducer.selected._id;
export const selectedGraphName = (state: RootState) => state.graphListReducer.selected.name;
export const selectedGraphDescription = (state: RootState) => state.graphListReducer.selected.description;
export const selectedGraphType = (state: RootState) => state.graphListReducer.selected.graphType;
export const selectedGraphColor = (state: RootState) => state.graphListReducer.selected.color;
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
