import { model } from "mongoose";
import { IGraphDocument } from "./types";
import GraphSchema from "./schema";

export const GraphModel = model<IGraphDocument>("graph", GraphSchema);
