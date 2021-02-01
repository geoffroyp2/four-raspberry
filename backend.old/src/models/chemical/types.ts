import { Document, Model, MongooseUpdateQuery } from "mongoose";
import { ChemicalSimpleEditFilter } from "../../controllers/chemical/types";

export interface IChemical {
  name: string;
  chemicalName: string;
  mass: number; //volumetric mass density r = m / V
  lastUpdated: string;
}

export interface Chemical extends IChemical {
  _id: string; // to match the _id from the model
}

export interface IChemicalDocument extends Document, IChemical {}

export interface IChemicalModel extends Model<IChemicalDocument>, IChemical {
  createChemical: (this: IChemicalModel) => Promise<IChemicalDocument>;
  updateChemical: (
    this: IChemicalModel,
    id: string,
    filter: MongooseUpdateQuery<IChemicalModel> | ChemicalSimpleEditFilter
  ) => Promise<IChemicalDocument>;
}
