import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Color, Target, TargetPoint } from "@baseTypes/database/GQLResTypes";

interface TargetDataType {
  needsRefresh: boolean;
  targetId: number;
  data: Target;
  tempValues: {
    color: Color;
  };
  points: TargetPoint[];
  loadList: Target[];
}

const initialState: TargetDataType = {
  needsRefresh: false,
  targetId: 0,
  data: {},
  points: [],
  tempValues: {
    color: { r: 255, g: 255, b: 255, a: 1 },
  },
  loadList: [],
};

export const targetDataSlice = createSlice({
  name: "targetData",
  initialState,
  reducers: {
    setTargetId: (state, action: PayloadAction<number>) => {
      state.targetId = action.payload;
    },
    setTargetData: (state, action: PayloadAction<Target>) => {
      if (action.payload.id) {
        state.targetId = action.payload.id;
        state.data = action.payload;

        if (action.payload.color) {
          state.tempValues.color = action.payload.color;
        }
      }
    },
    setTargetNeedsRefresh: (state, action: PayloadAction<boolean>) => {
      state.needsRefresh = action.payload;
    },
    setTargetLoadList: (state, action: PayloadAction<Target[]>) => {
      state.loadList = action.payload;
    },
    setTargetTempValues: (state, action: PayloadAction<Partial<TargetDataType["tempValues"]>>) => {
      state.tempValues = { ...state.tempValues, ...action.payload };
    },
    setTargetPoints: (state, action: PayloadAction<TargetPoint[] | undefined>) => {
      if (action.payload) state.points = action.payload;
    },
  },
});

export const {
  setTargetId,
  setTargetData,
  setTargetLoadList,
  setTargetNeedsRefresh,
  setTargetTempValues,
  setTargetPoints,
} = targetDataSlice.actions;

export const selectTargetNeedsRefresh = (state: RootState) => state.targetData.needsRefresh;
export const selectTargetId = (state: RootState) => state.targetData.targetId;
export const selectTargetData = (state: RootState) => state.targetData.data;
export const selectTargetLoadList = (state: RootState) => state.targetData.loadList;
export const selectTargetPoints = (state: RootState) => state.targetData.points;
export const selectTargetTempValues = (state: RootState) => state.targetData.tempValues;

export default targetDataSlice.reducer;
