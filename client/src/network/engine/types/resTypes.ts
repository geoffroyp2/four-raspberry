import { Graph } from "@clientTypes/Graph";
import { EngineStatus } from "@clientTypes/programInterfaces";

export enum EngineResId {
  error,
  succes,
}

export type EngineRes =
  | {
      id: EngineResId.succes;
      data: EngineStatus | Graph;
    }
  | {
      id: EngineResId.error;
      data: string;
    };
