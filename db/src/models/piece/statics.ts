import { PieceEditFilter } from "../../controllers/piece/types";
import { IPieceDocument, IPieceModel } from "./types";

export async function createPiece(this: IPieceModel): Promise<IPieceDocument> {
  // TODO: generate new unique name
  return this.create({
    name: "Sans nom",
    description: "",
    records: [],
    images: [],
    formula: "",
    date: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  });
}

export async function updatePiece(this: IPieceModel, id: string, filter: PieceEditFilter): Promise<IPieceDocument> {
  return await this.findOneAndUpdate(
    { _id: id },
    { ...filter, lastUpdated: new Date().toISOString() },
    { new: true, useFindAndModify: false }
  ).exec();
}
