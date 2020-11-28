import { IGraph } from "../../../db/src/models/graph/types";
import { EngineStatus as ESCLient } from "../../../client/src/types/programInterfaces";

export interface Graph extends IGraph {
  _id: string;
}

export const emptyGraph: Graph = {
  _id: "",
  name: "",
  description: "",
  graphType: true,
  graphRef: "",
  points: [],
  pieces: [],
  color: { r: 0, g: 0, b: 0 },
  date: "",
};

export interface EngineStatus extends ESCLient {}
