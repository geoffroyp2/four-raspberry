import { Document, Model } from "mongoose";
import { PieceEditFilter } from "../../controllers/piece/types";

export interface IPiece {
  name: string;
  description: string;
  records: string[];
  images: string[];
  formula: string;
  date: string;
  lastUpdated: string;
}

export interface Piece extends IPiece {
  _id: string; // to match the _id from the model
}

export interface IPieceDocument extends Document, IPiece {}

export interface IPieceModel extends Model<IPieceDocument>, IPiece {
  createPiece: (this: IPieceModel) => Promise<IPieceDocument>;
  updatePiece: (this: IPieceModel, id: string, filter: PieceEditFilter) => Promise<IPieceDocument>;
}
