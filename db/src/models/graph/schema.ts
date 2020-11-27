import { Schema } from "mongoose";
import { setLastUpdated } from "./methods";
import { createNewGraph, updateGraph } from "./statics";

const GraphSchema = new Schema(
  {
    name: String,
    description: String,
    graphType: Boolean,
    graphRef: String,
    color: {
      type: {
        r: Number,
        g: Number,
        b: Number,
        a: Number,
      },
      default: { r: 210, g: 210, b: 210, a: 0.9 },
    },
    points: {
      type: [
        {
          x: Number,
          y: Number,
        },
      ],
      default: [],
    },
    pieces: {
      type: [String],
      default: [],
    },
    date: Date,
    lastUpdated: Date,
  },
  { collection: "graphs" }
);

GraphSchema.statics.createNewGraph = createNewGraph;
GraphSchema.statics.updateGraph = updateGraph;

GraphSchema.methods.setLastUpdated = setLastUpdated;

export default GraphSchema;
