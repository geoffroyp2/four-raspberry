import { model } from "mongoose";
import { IGraphDocument } from "./graphTypes";
import GraphSchema from "./graphSchema";

export const GraphModel = model<IGraphDocument>("graph", GraphSchema);
