import { FormulaEditFilter } from "../../controllers/formula/types";
import { IFormulaDocument, IFormulaModel } from "./types";

export async function createFormula(this: IFormulaModel): Promise<IFormulaDocument> {
  // TODO: generate new unique name
  return this.create({
    name: "Sans nom",
    description: "",
    pieces: [],
    composition: [],
    lastUpdated: new Date().toISOString(),
  });
}

export async function updateFormula(this: IFormulaModel, data: FormulaEditFilter): Promise<IFormulaDocument> {
  return await this.findOneAndUpdate(
    { _id: data.id },
    { ...data.filter, lastUpdated: new Date().toISOString() },
    { new: true, useFindAndModify: false }
  ).exec();
}
