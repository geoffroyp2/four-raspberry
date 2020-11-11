import { Document, Model } from "mongoose";
import {
  Color,
  Point,
} from "../../../../client/src/interfaces/programInterfaces";

export interface IGraph {
  name: string;
  description: string;
  graphType: string;
  color: Color;
  points: Point[];
  date?: Date;
  lastUpdated?: Date;
}

export interface IGraphDocument extends IGraph, Document {
  setLastUpdated: (this: IGraphDocument) => Promise<void>;
}

export interface IGraphModel extends IGraph, Model<IGraphDocument> {
  findModelGraphs: (this: IGraphModel) => Promise<IGraphDocument[]>;
  findRecordedGraphs: (this: IGraphModel) => Promise<IGraphDocument[]>;
}
