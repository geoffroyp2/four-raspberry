import { IGraph } from "../../../db/src/models/graph/types";

// to access _id easily and have a single contact point
export interface Graph extends IGraph {
  _id: string;
}
