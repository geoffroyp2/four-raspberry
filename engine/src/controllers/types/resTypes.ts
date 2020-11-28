import { EngineStatus } from "../../engine/types";

export enum EngineResId {
  error,
  succes,
}

export type EngineRes =
  | {
      id: EngineResId.succes;
      data: EngineStatus;
    }
  | {
      id: EngineResId.error;
      data: string;
    };
