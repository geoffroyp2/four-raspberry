import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Color, Target, TargetPoint } from "@app/_types/dbTypes";

interface TargetDataType {
  data: Target;
  tempValues: {
    color: Color;
    points: TargetPoint[];
  };
  points: TargetPoint[];
  loadList: Target[];
  preview: Target;
}

const initialState: TargetDataType = {
  data: {},
  points: [],
  tempValues: {
    color: { r: 255, g: 255, b: 255, a: 1 },
    points: [],
  },
  loadList: [],
  preview: {},
};

export const targetDataSlice = createSlice({
  name: "targetData",
  initialState,
  reducers: {
    setTargetData: (state, action: PayloadAction<Target>) => {
      if (action.payload.id) {
        state.data = action.payload;

        if (action.payload.color) {
          state.tempValues.color = action.payload.color;
        }
      }
    },
    setTargetLoadList: (state, action: PayloadAction<Target[]>) => {
      state.loadList = action.payload;
    },
    setTargetTempColor: (state, action: PayloadAction<Color>) => {
      state.tempValues.color = action.payload;
    },
    setTargetPoints: (state, action: PayloadAction<TargetPoint[] | undefined>) => {
      if (action.payload) {
        state.points = action.payload;
        state.tempValues.points = action.payload;
      }
    },
    setTargetTempPoint: (state, action: PayloadAction<{ point: TargetPoint; index: number }>) => {
      if (action.payload.index >= 0 && action.payload.index < state.tempValues.points.length)
        state.tempValues.points[action.payload.index] = action.payload.point;
    },
    addTargetTempPoint: (state, action: PayloadAction<void>) => {
      state.tempValues.points.push({ time: 0, temperature: 0, oxygen: 0 });
    },
    removeTargetTempPoint: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.tempValues.points.length)
        state.tempValues.points.splice(action.payload, 1);
    },
    resetTargetTempPoints: (state, action: PayloadAction<void>) => {
      state.tempValues.points = state.points;
    },
    setTargetPreview: (state, action: PayloadAction<Target>) => {
      state.preview = action.payload;
    },
  },
});

export const {
  setTargetData,
  setTargetLoadList,
  setTargetTempColor,
  setTargetPoints,
  setTargetPreview,
  setTargetTempPoint,
  addTargetTempPoint,
  removeTargetTempPoint,
  resetTargetTempPoints,
} = targetDataSlice.actions;

export const selectTargetData = (state: RootState) => state.targetData.data;
export const selectTargetLoadList = (state: RootState) => state.targetData.loadList;
export const selectTargetPoints = (state: RootState) => state.targetData.points;
export const selectTargetTempColor = (state: RootState) => state.targetData.tempValues.color;
export const selectTargetPreview = (state: RootState) => state.targetData.preview;
export const selectTargetTempPoints = (state: RootState) => state.targetData.tempValues.points;

export default targetDataSlice.reducer;
