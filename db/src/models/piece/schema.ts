import { Schema } from "mongoose";
import { createPiece, updatePiece } from "./statics";

const PieceSchema = new Schema(
  {
    name: String,
    description: String,
    records: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    formula: String,
    date: Date,
    lastUpdated: Date,
  },
  { collection: "piece" }
);

PieceSchema.statics.createPiece = createPiece;
PieceSchema.statics.updatePiece = updatePiece;

export default PieceSchema;
