import { model } from "mongoose";
import { IPieceDocument, IPieceModel } from "./types";
import GraphSchema from "./schema";

export const PieceModel = model<IPieceDocument, IPieceModel>("piece", GraphSchema);
