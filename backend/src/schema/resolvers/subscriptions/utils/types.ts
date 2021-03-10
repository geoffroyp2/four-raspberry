// Live subscription for frontend

export type SensorValuesType = {
  oxygen: number;
  temperature: number;
};
export type SensorUpdateType = SensorValuesType & { time: number };

export type LiveValuesType = {
  status: LiveStatusType;
  sensors: SensorValuesType;
  programTime: number;
  currentTargetId: number | null;
  currentRecordId: number | null;
  monitoring: boolean;
  refresh: boolean;
};

// Commands subscription for engine
export type LiveStatusType = "start" | "stop" | "pause";
export type CommandNameType = LiveStatusType | "ping" | "monitoring" | "targetId";
export type CommandOptionnalType = number | null;
export type CommandType = {
  name: CommandNameType;
  option: CommandOptionnalType;
};

export type statusUpdateType = {
  status?: LiveStatusType;
  targetId?: number;
  recordId?: number;
  monitoring?: boolean;
  refresh?: boolean;
};
