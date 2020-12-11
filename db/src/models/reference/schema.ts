import { Schema } from "mongoose";
import { createReference, updateReference } from "./statics";

const ReferenceSchema = new Schema(
  {
    name: String,
    description: String,
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
    records: {
      type: [String],
      default: [],
    },
    lastUpdated: Date,
  },
  { collection: "reference" }
);

ReferenceSchema.statics.createReference = createReference;
ReferenceSchema.statics.updateReference = updateReference;

export default ReferenceSchema;
