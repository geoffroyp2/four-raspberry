import { IGraph } from "../../../db/src/models/graph/types";

export interface Graph extends IGraph {
  _id: string;
}

export interface SensorValues {
  oxy: number;
  temp: number;
}
