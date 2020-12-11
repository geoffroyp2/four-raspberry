import { IGraph } from "../../../models/graph/types";

export enum GraphResId {
  error,
  succes,
}

interface Graph extends IGraph {
  _id: string;
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
