import { IGraph } from "../../../db/src/models/graph/types";

// to access _id easily
export type GraphTypeString = "modèle" | "cuisson";
export interface Graph extends IGraph {
  _id: string;
}
