import { ReferenceEditFilter } from "../../controllers/reference/types";
import { IReferenceDocument, IReferenceModel } from "./types";

export async function createReference(this: IReferenceModel): Promise<IReferenceDocument> {
  // TODO: generate new unique name
  return this.create({
    name: "Sans nom",
    description: "",
    color: { r: 230, g: 30, b: 30, a: 0.9 },
    points: [],
    records: [],
    lastUpdated: new Date().toISOString(),
  });
}

export async function updateReference(
  this: IReferenceModel,
  id: string,
  filter: ReferenceEditFilter
): Promise<IReferenceDocument> {
  return await this.findOneAndUpdate(
    { _id: id },
    { ...filter, lastUpdated: new Date().toISOString() },
    { new: true, useFindAndModify: false }
  ).exec();
}
