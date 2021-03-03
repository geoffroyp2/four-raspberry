export type SensorValuesType = {
  oxygen: number;
  temperature: number;
};

export type StatusType = "start" | "stop" | "pause";

export type LiveValuesType = {
  status: StatusType;
  sensors: SensorValuesType;
  currentTargetId: number;
};

export const liveValues: LiveValuesType = {
  status: "stop",
  sensors: {
    oxygen: 0,
    temperature: 0,
  },
  currentTargetId: 0,
};
