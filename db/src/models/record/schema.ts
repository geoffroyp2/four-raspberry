import { Schema } from "mongoose";
import { createRecord, updateRecord } from "./statics";

const RecordSchema = new Schema(
  {
    name: String,
    description: String,
    reference: String,
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
  { collection: "record" }
);

RecordSchema.statics.createRecord = createRecord;
RecordSchema.statics.updateRecord = updateRecord;

export default RecordSchema;
