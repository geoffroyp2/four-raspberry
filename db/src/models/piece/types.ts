import { Document, Model } from "mongoose";
import { Color } from "../shared/types";

export interface Chemical {
  name: string;
  composition: string;
  color: Color;
}

export interface Ingredient {
  chemical: Chemical;
  amount: number;
}

export interface IPiece {
  name: string;
  description: string;
  type: "string";
  graphRef: "string"; // Graph _id
  composition: Ingredient[];
  images: string[];
  date?: string;
  lastUpdated?: string;
}

export interface IPieceDocument extends Document, IPiece {
  //   setLastUpdated: (this: IGraphDocument) => Promise<void>;
}

export interface IPieceModel extends Model<IPieceDocument>, IPiece {
  //   findModelGraphs: (this: IGraphModel) => Promise<IGraphDocument[]>;
  //   findRecordedGraphs: (this: IGraphModel) => Promise<IGraphDocument[]>;
  //   createNewGraph: (this: IGraphModel, filter: NewGraphFilter) => Promise<IGraphDocument>;
  //   updateGraph: (this: IGraphModel, graphId: string, filter: GraphEditFilter) => Promise<IGraphDocument>;
}
