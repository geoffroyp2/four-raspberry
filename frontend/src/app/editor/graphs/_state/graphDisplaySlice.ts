import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface GraphDisplayType {
  route: "targets" | "records";
}

const initialState: GraphDisplayType = {
  route: "records",
};

export const graphDisplaySlice = createSlice({
  name: "graphDisplay",
  initialState,
  reducers: {
    setGraphRoute: (state, action: PayloadAction<GraphDisplayType["route"]>) => {
      state.route = action.payload;
    },
  },
});

export const { setGraphRoute } = graphDisplaySlice.actions;

export const selectGraphRoute = (state: RootState) => state.graphDisplay.route;

export default graphDisplaySlice.reducer;
