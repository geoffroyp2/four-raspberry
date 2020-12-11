import { Graph } from "@clientTypes/Graph";
import { createSlice } from "@reduxjs/toolkit";

type RecordGraphsSliceType = {
  selected: Graph | null;
  memo: Graph | null;
};

const initialState: RecordGraphsSliceType = {
  selected: null,
  memo: null,
};

const recordGraphsSlice = createSlice({
  name: "CGraph",
  initialState,
  reducers: {},
});
