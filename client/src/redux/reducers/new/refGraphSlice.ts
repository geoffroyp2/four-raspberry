import { Graph } from "@clientTypes/Graph";
import { createSlice } from "@reduxjs/toolkit";

type RefGraphSliceType = {
  selected: Graph | null;
  memo: Graph | null; // To be able to roll back changes
};

const initialState: RefGraphSliceType = {
  selected: null,
  memo: null,
};

const refGraphSlice = createSlice({
  name: "refGraph",
  initialState,
  reducers: {},
});
