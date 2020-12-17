import { Graph } from "@src/../../cy/types/Graph";
import { EngineStatus } from "@src/../../cy/types/programInterfaces";

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
