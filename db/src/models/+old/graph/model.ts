import { model } from "mongoose";
import { IGraphDocument, IGraphModel } from "./types";
import GraphSchema from "./schema";

export const GraphModel = model<IGraphDocument, IGraphModel>(
  "graph",
  GraphSchema
);
