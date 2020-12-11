import { Graph } from "@clientTypes/Graph";

export enum GraphResId {
  error,
  succes,
}

export type GraphRes =
  | {
      id: GraphResId.succes;
      data: Graph[];
    }
  | {
      id: GraphResId.error;
      data: string;
    };
