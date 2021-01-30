import { MongooseUpdateQuery } from "mongoose";
import { FormulaSimpleEditFilter } from "../../controllers/formula/types";
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

export async function updateFormula(
  this: IFormulaModel,
  id: string,
  filter: MongooseUpdateQuery<IFormulaModel> | FormulaSimpleEditFilter
): Promise<IFormulaDocument> {
  return await this.findOneAndUpdate(
    { _id: id },
    { ...filter, lastUpdated: new Date().toISOString() },
    { new: true, useFindAndModify: false }
  ).exec();
}
