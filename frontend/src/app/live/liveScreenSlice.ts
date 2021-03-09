import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { LiveValuesType } from "@baseTypes/database/GQLResTypes";

const initialState: LiveValuesType = {
  status: "stop",
  programTime: 0,
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
      // state = action.payload;
      state.status = action.payload.status;
      state.sensors = action.payload.sensors;
      state.currentTargetId = action.payload.currentTargetId;
      state.programTime = action.payload.programTime;
    },
  },
});

export const { setLiveValues } = mainNavSlice.actions;

export const selectLiveStatus = (state: RootState) => state.live.status;
export const selectLiveSensorValues = (state: RootState) => state.live.sensors;
export const selectLiveTargetId = (state: RootState) => state.live.currentTargetId;
export const selectLiveProgramTime = (state: RootState) => state.live.programTime;

export default mainNavSlice.reducer;
