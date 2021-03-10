// API RESULTS

export type LiveSubscribeResType = {
  live: LiveValuesType;
};

export type CommandSubscribeResType = {
  command: CommandType;
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

export interface Record {
  id?: number;
  name?: string;
  description?: string;
  finished?: boolean;
}

export interface RecordPoint {
  id?: number;
  time?: number;
  temperature?: number;
  oxygen?: number;
}
export type RecordPointCreationAttributes = Required<Pick<RecordPoint, "time" | "temperature" | "oxygen">>;

// LIVE DATA

export type SensorValuesType = {
  oxygen: number;
  temperature: number;
};
export type LiveValuesType = {
  status: LiveStatusType;
  currentTargetId: number;
};

// COMMANDS DATA

export type LiveStatusType = "start" | "stop" | "pause";

export type CommandNameType = LiveStatusType | "ping" | "monitoring" | "targetId";
export type CommandOptionnalType = number | null;

export type CommandType = {
  name: CommandNameType;
  option: CommandOptionnalType;
};
