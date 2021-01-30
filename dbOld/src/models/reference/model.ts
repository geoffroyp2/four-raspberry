import { model } from "mongoose";
import { IReferenceDocument, IReferenceModel } from "./types";
import GraphSchema from "./schema";

export const ReferenceModel = model<IReferenceDocument, IReferenceModel>("reference", GraphSchema);
