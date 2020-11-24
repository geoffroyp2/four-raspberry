import { model } from "mongoose";
import { IPieceDocument, IPieceModel } from "./types";
import PieceSchema from "./schema";

export const PieceModel = model<IPieceDocument, IPieceModel>("piece", PieceSchema);
