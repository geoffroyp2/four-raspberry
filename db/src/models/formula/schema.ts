import { Schema } from "mongoose";
import { createFormula, updateFormula } from "./statics";

const FormulaSchema = new Schema(
  {
    name: String,
    description: String,
    pieces: [String],
    composition: {
      type: [
        {
          id: String,
          amount: Number,
        },
      ],
      default: [],
    },
    lastUpdated: Date,
  },
  { collection: "formula" }
);

FormulaSchema.statics.createFormula = createFormula;
FormulaSchema.statics.updateFormula = updateFormula;

export default FormulaSchema;
