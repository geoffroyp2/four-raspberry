import { RecordEditFilter } from "../../controllers/record/types";
import { IRecordDocument, IRecordModel } from "./types";

export async function createRecord(this: IRecordModel): Promise<IRecordDocument> {
  // TODO: generate new unique name
  return this.create({
    name: "Sans nom",
    description: "",
    reference: "",
    color: { r: 230, g: 30, b: 30, a: 0.9 },
    points: [],
    pieces: [],
    date: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  });
}

export async function updateRecord(this: IRecordModel, data: RecordEditFilter): Promise<IRecordDocument> {
  return await this.findOneAndUpdate(
    { _id: data.id },
    { ...data.filter, lastUpdated: new Date().toISOString() },
    { new: true, useFindAndModify: false }
  ).exec();
}
