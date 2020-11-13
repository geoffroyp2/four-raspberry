import { Document, Model } from "mongoose";

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

export interface IGraph {
  name: string;
  description: string;
  graphType: string;
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
}
