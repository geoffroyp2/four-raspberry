export type EngineStatusType = "run" | "stop" | "pause";

export interface EngineState {
  values: ValuesType;
  status: EngineStatusType;
  refID: string;
  times: {
    start: number;
    totalRun: number;
    totalPause: number;
  };
}

export interface ValuesType {
  sensor: {
    v1: number;
    v2: number;
    v3: number;
    v4: number;
    v5: number;
    v6: number;
    v7: number;
    v8: number;
  };
  target: {
    temperature: number;
  };
}

export const emptyValues: ValuesType = {
  sensor: {
    v1: 0,
    v2: 0,
    v3: 0,
    v4: 0,
    v5: 0,
    v6: 0,
    v7: 0,
    v8: 0,
  },
  target: {
    temperature: 0,
  },
};
