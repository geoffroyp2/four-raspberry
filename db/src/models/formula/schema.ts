import { Schema } from "mongoose";
// import { setLastUpdated } from "./methods";
import { createFormula, updateFormula } from "./statics";

const FormulaSchema = new Schema(
  {
    name: String,
    description: String,
    composition: {
      type: [
        {
          chem: String,
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