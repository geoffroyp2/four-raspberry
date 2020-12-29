import { Document, Model } from "mongoose";
import { RecordEditFilter } from "../../controllers/record/types";
import { Color, Point } from "../shared/types";

export interface IRecord {
  name: string;
  description: string;
  reference: string;
  color: Color;
  points: Point[];
  pieces: string[];
  date: string;
  lastUpdated: string;
}

export interface Record extends IRecord {
  _id: string; // to match the _id from the model
}

export interface IRecordDocument extends Document, IRecord {}

export interface IRecordModel extends Model<IRecordDocument>, IRecord {
  createRecord: (this: IRecordModel) => Promise<IRecordDocument>;
  updateRecord: (this: IRecordModel, id: string, data: RecordEditFilter) => Promise<IRecordDocument>;
}
