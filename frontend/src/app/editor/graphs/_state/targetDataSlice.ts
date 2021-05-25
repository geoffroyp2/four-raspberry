import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { Color, Target, TargetPoint } from "@app/_types/dbTypes";

interface TargetDataType {
  data: Target;
  tempValues: {
    color: Color;
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
    setTargetTempValues: (state, action: PayloadAction<Partial<TargetDataType["tempValues"]>>) => {
      state.tempValues = { ...state.tempValues, ...action.payload };
    },
    setTargetPoints: (state, action: PayloadAction<TargetPoint[] | undefined>) => {
      if (action.payload) state.points = action.payload;
    },
    setTargetPreview: (state, action: PayloadAction<Target>) => {
      state.preview = action.payload;
    },
  },
});

export const { setTargetData, setTargetLoadList, setTargetTempValues, setTargetPoints, setTargetPreview } =
  targetDataSlice.actions;

export const selectTargetData = (state: RootState) => state.targetData.data;
export const selectTargetLoadList = (state: RootState) => state.targetData.loadList;
export const selectTargetPoints = (state: RootState) => state.targetData.points;
export const selectTargetTempValues = (state: RootState) => state.targetData.tempValues;
export const selectTargetPreview = (state: RootState) => state.targetData.preview;

export default targetDataSlice.reducer;
