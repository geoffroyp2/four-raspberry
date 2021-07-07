import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Target, TargetPoint } from "@app/_types/dbTypes";

interface TargetDataType {
  data: Target;
  tempValues: {
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
      }
    },
    setTargetLoadList: (state, action: PayloadAction<Target[]>) => {
      state.loadList = action.payload;
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
export const selectTargetColor = (state: RootState) => state.targetData.data.color;
export const selectTargetPreview = (state: RootState) => state.targetData.preview;
export const selectTargetTempPoints = (state: RootState) => state.targetData.tempValues.points;

export default targetDataSlice.reducer;
