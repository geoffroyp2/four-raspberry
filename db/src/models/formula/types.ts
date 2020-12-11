import { Document, Model } from "mongoose";
import { FormulaEditFilter } from "../../controllers/formula/types";
import { Color, Point } from "../shared/types";

export interface IFormula {
  name: string;
  description: string;
  composition: { chem: string; amount: number }[];
  lastUpdated: string;
}

export interface Formula extends IFormula {
  _id: string; // to match the _id from the model
}

export interface IFormulaDocument extends Document, IFormula {}

export interface IFormulaModel extends Model<IFormulaDocument>, IFormula {
  createFormula: (this: IFormulaModel) => Promise<IFormulaDocument>;
  updateFormula: (this: IFormulaModel, data: FormulaEditFilter) => Promise<IFormulaDocument>;
}
