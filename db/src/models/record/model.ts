import { model } from "mongoose";
import { IRecordDocument, IRecordModel } from "./types";
import GraphSchema from "./schema";

export const RecordModel = model<IRecordDocument, IRecordModel>("record", GraphSchema);
