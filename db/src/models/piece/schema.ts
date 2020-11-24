import { Schema } from "mongoose";
import { ColorSchema } from "../shared/schema";
// import { setLastUpdated } from "./methods";
// import { findModelGraphs, findRecordedGraphs, createNewGraph, updateGraph } from "./statics";

// const IngredientSchema = new Schema({
//   chemical: {
//     name: String,
//     composition: String,
//     color: {
//       r: Number,
//       g: Number,
//       b: Number,
//       a: Number,
//     },
//   },
//   amount: Number,
// });

const PieceSchema = new Schema(
  {
    name: String,
    description: String,
    type: String,
    graphRef: String,
    composition: [
      {
        chemical: {
          name: String,
          composition: String,
          color: {
            r: Number,
            g: Number,
            b: Number,
            a: Number,
          },
        },
        amount: Number,
      },
    ],
    images: [String],
    date: Date,
    lastUpdated: Date,
  },
  { collection: "pieces" }
);

// GraphSchema.statics.findModelGraphs = findModelGraphs;
// GraphSchema.statics.findRecordedGraphs = findRecordedGraphs;
// GraphSchema.statics.createNewGraph = createNewGraph;
// GraphSchema.statics.updateGraph = updateGraph;

// GraphSchema.methods.setLastUpdated = setLastUpdated;

export default PieceSchema;
