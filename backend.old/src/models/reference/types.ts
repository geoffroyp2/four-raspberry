import { Document, Model, MongooseUpdateQuery } from "mongoose";
import { ReferenceSimpleEditFilter } from "../../controllers/reference/types";
import { Color, Point } from "../shared/types";

export interface IReference {
  name: string;
  description: string;
  color: Color;
  points: Point[];
  records: string[];
  lastUpdated: string;
}

export interface Reference extends IReference {
  _id: string; // to match the _id from the model
}

export interface IReferenceDocument extends Document, IReference {}

export interface IReferenceModel extends Model<IReferenceDocument>, IReference {
  createReference: (this: IReferenceModel) => Promise<IReferenceDocument>;
  updateReference: (
    this: IReferenceModel,
    id: string,
    data: MongooseUpdateQuery<IReferenceModel> | ReferenceSimpleEditFilter
  ) => Promise<IReferenceDocument>;
}
