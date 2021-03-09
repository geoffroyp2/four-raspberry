export type SensorUpdateType = SensorValuesType & {
  time: number;
};

export type SensorValuesType = {
  oxygen: number;
  temperature: number;
};

export type StatusType = "start" | "stop" | "pause";

export type LiveValuesType = {
  status: StatusType;
  programTime: number;
  sensors: SensorValuesType;
  currentTargetId: number;
};

export const liveValues: LiveValuesType = {
  status: "stop",
  programTime: 0,
  sensors: {
    oxygen: 0,
    temperature: 0,
  },
  currentTargetId: 0,
};

export type CommandValuesType = {
  status: StatusType;
  targetId: number;
};

export const lastCommand: CommandValuesType = {
  status: "stop",
  targetId: 0,
};
