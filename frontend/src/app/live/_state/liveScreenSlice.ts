import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { LiveValuesType, Record, Target } from "@app/_types/dbTypes";
import { PointFilter } from "@app/_types/queryTypes";

type LiveDataType = {
  target: Target;
  record: Record;
  pointZoom: Required<PointFilter>;
  values: LiveValuesType;
};

const initialState: LiveDataType = {
  target: {},
  record: {},
  pointZoom: {
    start: 0,
    end: 2147483647,
    amount: 70,
  },
  values: {
    status: "stop",
    programTime: 0,
    sensors: {
      oxygen: 0,
      temperature: 0,
    },
    currentTargetId: null,
    currentRecordId: null,
    monitoring: false,
    refresh: false,
  },
};

export const mainNavSlice = createSlice({
  name: "liveData",
  initialState,
  reducers: {
    setLiveValues: (state, action: PayloadAction<LiveValuesType>) => {
      state.values = action.payload;
    },
    setLiveRecord: (state, action: PayloadAction<Record>) => {
      state.record = action.payload;
    },
    setLiveTarget: (state, action: PayloadAction<Target>) => {
      state.target = action.payload;
    },
    setLivePointZoom: (state, action: PayloadAction<PointFilter>) => {
      state.pointZoom = { ...state.pointZoom, ...action.payload };
    },
  },
});

export const { setLiveValues, setLiveRecord, setLiveTarget } = mainNavSlice.actions;

export const selectLiveStatus = (state: RootState) => state.live.values.status;
export const selectLiveSensorValues = (state: RootState) => state.live.values.sensors;
export const selectLiveTargetId = (state: RootState) => state.live.values.currentTargetId;
export const selectLiveRecordId = (state: RootState) => state.live.values.currentRecordId;
export const selectLiveProgramTime = (state: RootState) => state.live.values.programTime;
export const selectLiveMonitoring = (state: RootState) => state.live.values.monitoring;
export const selectLiveRefresh = (state: RootState) => state.live.values.refresh;
export const selectLiveRecord = (state: RootState) => state.live.record;
export const selectLiveTarget = (state: RootState) => state.live.target;
export const selectLivePointZoom = (state: RootState) => state.live.pointZoom;

export default mainNavSlice.reducer;
