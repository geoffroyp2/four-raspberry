import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface GraphDisplayType {
  route: "targets" | "records";

  redirect: "url" | "api" | null;
}

const initialState: GraphDisplayType = {
  route: "records",

  redirect: null,
};

export const graphDisplaySlice = createSlice({
  name: "graphDisplay",
  initialState,
  reducers: {
    setGraphRoute: (state, action: PayloadAction<GraphDisplayType["route"]>) => {
      state.route = action.payload;
    },

    setGraphRedirect: (state, action: PayloadAction<GraphDisplayType["redirect"]>) => {
      state.redirect = action.payload;
    },
  },
});

export const { setGraphRoute, setGraphRedirect } = graphDisplaySlice.actions;

export const selectGraphRoute = (state: RootState) => state.graphDisplay.route;
export const selectGraphRedirect = (state: RootState) => state.graphDisplay.redirect;

export default graphDisplaySlice.reducer;
