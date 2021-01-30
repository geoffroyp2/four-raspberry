import { model } from "mongoose";
import { IChemicalDocument, IChemicalModel } from "./types";
import GraphSchema from "./schema";

export const ChemicalModel = model<IChemicalDocument, IChemicalModel>("chemical", GraphSchema);
