import { Document, Model } from "mongoose";
import { GraphEditFilter, NewGraphFilter } from "../../controllers/queryFormat";

export interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface Point {
  x: number;
  y: number;
}

export type GraphTypeString = "modèle" | "cuisson";

export interface IGraph {
  name: string;
  description: string;
  graphType: GraphTypeString;
  color: Color;
  points: Point[];
  date?: Date;
  lastUpdated?: Date;
}

export interface IGraphDocument extends Document, IGraph {
  setLastUpdated: (this: IGraphDocument) => Promise<void>;
}

export interface IGraphModel extends Model<IGraphDocument>, IGraph {
  findModelGraphs: (this: IGraphModel) => Promise<IGraphDocument[]>;
  findRecordedGraphs: (this: IGraphModel) => Promise<IGraphDocument[]>;
  createNewGraph: (
    this: IGraphModel,
    filter: NewGraphFilter
  ) => Promise<IGraphDocument>;
  updateGraph: (
    this: IGraphModel,
    graph: IGraph,
    filter: GraphEditFilter
  ) => Promise<IGraphDocument>;
}
