import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Color, Target, TargetPoint } from "@baseTypes/database/GQLResTypes";

interface TargetDataType {
  targetId: number;
  data: Target;
  tempValues: {
    color: Color;
  };
  points: TargetPoint[];
  loadList: Target[];
}

const initialState: TargetDataType = {
  targetId: 1,
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
    setCurrentTargetId: (state, action: PayloadAction<number>) => {
      state.targetId = action.payload;
    },
    setTargetData: (state, action: PayloadAction<Target>) => {
      state.data = action.payload;

      if (action.payload.color) {
        state.tempValues.color = action.payload.color;
      }
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
  setCurrentTargetId,
  setTargetData,
  setTargetLoadList,
  setTargetTempValues,
  setTargetPoints,
} = targetDataSlice.actions;

export const selectTargetId = (state: RootState) => state.targetData.targetId;
export const selectTargetData = (state: RootState) => state.targetData.data;
export const selectTargetLoadList = (state: RootState) => state.targetData.loadList;
export const selectTargetPoints = (state: RootState) => state.targetData.points;
export const selectTargetTempValues = (state: RootState) => state.targetData.tempValues;

export default targetDataSlice.reducer;
