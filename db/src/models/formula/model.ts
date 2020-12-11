import { model } from "mongoose";
import { IFormulaDocument, IFormulaModel } from "./types";
import GraphSchema from "./schema";

export const FormulaModel = model<IFormulaDocument, IFormulaModel>("formula", GraphSchema);
