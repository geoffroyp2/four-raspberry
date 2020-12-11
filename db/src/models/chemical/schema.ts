import { Schema } from "mongoose";
// import { setLastUpdated } from "./methods";
import { createChemical, updateChemical } from "./statics";

const ChemicalSchema = new Schema(
  {
    name: String,
    chemicalName: String,
    mass: Number,
    lastUpdated: Date,
  },
  { collection: "chemical" }
);

ChemicalSchema.statics.createChemical = createChemical;
ChemicalSchema.statics.updateChemical = updateChemical;

export default ChemicalSchema;
