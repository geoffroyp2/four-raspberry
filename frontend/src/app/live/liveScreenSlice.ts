import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { LiveStatusType } from "@baseTypes/database/GQLMutationTypes";

export type SensorValuesType = {
  oxygen: number;
  temperature: number;
};

export type LiveValuesType = {
  status: LiveStatusType;
  sensors: SensorValuesType;
  currentTargetId: number;
};

const initialState: LiveValuesType = {
  status: "stop",
  sensors: {
    oxygen: 0,
    temperature: 0,
  },
  currentTargetId: 0,
};

export const mainNavSlice = createSlice({
  name: "liveValues",
  initialState,
  reducers: {
    setLiveValues: (state, action: PayloadAction<LiveValuesType>) => {
      state.status = action.payload.status;
      state.sensors = action.payload.sensors;
      state.currentTargetId = action.payload.currentTargetId;
    },
  },
});

export const { setLiveValues } = mainNavSlice.actions;

export const selectLiveStatus = (state: RootState) => state.live.status;
export const selectLiveSensorValues = (state: RootState) => state.live.sensors;
export const selectLiveTargetId = (state: RootState) => state.live.currentTargetId;

export default mainNavSlice.reducer;
