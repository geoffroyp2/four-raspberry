import { Schema } from "mongoose";
import { setLastUpdated } from "./graphMethods";
import { findModelGraphs, findRecordedGraphs } from "./graphStatics";

const ColorSchema = new Schema({
  r: Number,
  g: Number,
  b: Number,
  a: Number,
});

const PointSchema = new Schema({
  x: Number,
  y: Number,
});

const GraphSchema = new Schema({
  name: String,
  description: String,
  graphType: {
    type: String,
    enum: ["model", "recorded"],
    default: "model",
  },
  color: {
    type: ColorSchema,
    default: { r: 0, g: 0, b: 0, a: 1 },
  },
  points: {
    type: [PointSchema],
    default: [],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});

GraphSchema.statics.findModelGraphs = findModelGraphs;
GraphSchema.statics.findRecordedGraphs = findRecordedGraphs;

GraphSchema.methods.setLastUpdated = setLastUpdated;

export default GraphSchema;
