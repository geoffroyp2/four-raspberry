import { ChemicalEditFilter } from "../../controllers/chemical/types";
import { IChemicalDocument, IChemicalModel } from "./types";

export async function createChemical(this: IChemicalModel): Promise<IChemicalDocument> {
  // TODO: generate new unique name
  return this.create({
    name: "Sans nom",
    chemicalName: "",
    mass: 1, //volumetric mass density r = m / V
    lastUpdated: new Date().toISOString(),
  });
}

export async function updateChemical(this: IChemicalModel, data: ChemicalEditFilter): Promise<IChemicalDocument> {
  return await this.findOneAndUpdate(
    { _id: data.id },
    { ...data.filter, lastUpdated: new Date().toISOString() },
    { new: true, useFindAndModify: false }
  ).exec();
}
