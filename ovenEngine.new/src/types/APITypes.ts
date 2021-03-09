export type OvenType = "gaz" | "electrique";

export interface Target {
  id?: number;
  name?: string;
  oven?: OvenType;
  points?: TargetPoint[];
}

export interface TargetPoint {
  id?: number;
  time?: number;
  temperature?: number;
  oxygen?: number;
}
