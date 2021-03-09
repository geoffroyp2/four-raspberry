// API RESULTS

export type LiveSubscribeResType = {
  data: {
    live: LiveValuesType;
  };
};

export type TargetQueryResType = {
  targets: {
    rows: Target[];
  };
};

// TARGET

export interface Target {
  id?: number;
  name?: string;
  oven?: OvenType;
  points?: TargetPoint[];
}
export type OvenType = "gaz" | "electrique";
export interface TargetPoint {
  id: number;
  time: number;
  temperature: number;
  oxygen: number;
}

// LIVE DATA

export type LiveStatusType = "start" | "stop" | "pause";
export type SensorValuesType = {
  oxygen: number;
  temperature: number;
};
export type LiveValuesType = {
  status: LiveStatusType;
  currentTargetId: number;
};
