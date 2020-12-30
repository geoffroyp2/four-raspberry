import { Document, Model, MongooseUpdateQuery } from "mongoose";
import { FormulaSimpleEditFilter } from "../../controllers/formula/types";

export interface IFormula {
  name: string;
  description: string;
  pieces: string[];
  composition: FormulaItem[];
  lastUpdated: string;
}

export type FormulaItem = { id: string; amount: number };

export interface Formula extends IFormula {
  _id: string; // to match the _id from the model
}

export interface IFormulaDocument extends Document, IFormula {}

export interface IFormulaModel extends Model<IFormulaDocument>, IFormula {
  createFormula: (this: IFormulaModel) => Promise<IFormulaDocument>;
  updateFormula: (
    this: IFormulaModel,
    id: string,
    filter: MongooseUpdateQuery<IFormulaModel> | FormulaSimpleEditFilter
  ) => Promise<IFormulaDocument>;
}
