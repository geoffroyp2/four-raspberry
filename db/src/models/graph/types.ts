import { Document, Model } from "mongoose";
import { GraphEditFilter } from "../../controllers/graphQueryFormat";
import { Color } from "../shared/types";

export interface Point {
  x: number;
  y: number;
}

export interface IGraph {
  name: string;
  description: string;
  graphType: boolean; // Modèle = true, Cuisson = false
  color: Color; // Graph display color
  points: Point[]; // Graph Points
  graphRef: string; // for a Cuisson: target Modèle Graph used for reference
  pieces: string[];
  date: string; // date of creation
  lastUpdated?: string;
}

export interface IGraphDocument extends Document, IGraph {
  setLastUpdated: (this: IGraphDocument) => Promise<void>;
}

export interface IGraphModel extends Model<IGraphDocument>, IGraph {
  findModelGraphs: (this: IGraphModel) => Promise<IGraphDocument[]>;
  findRecordedGraphs: (this: IGraphModel) => Promise<IGraphDocument[]>;
  createNewGraph: (this: IGraphModel, filter: GraphEditFilter) => Promise<IGraphDocument>;
  updateGraph: (this: IGraphModel, graphId: string, filter: GraphEditFilter) => Promise<IGraphDocument>;
}
