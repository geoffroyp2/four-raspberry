import { CommandType, LiveValuesType } from "./types";

export const liveValues: LiveValuesType = {
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
};

export const lastCommand: CommandType = {
  name: "stop",
  option: null,
};
