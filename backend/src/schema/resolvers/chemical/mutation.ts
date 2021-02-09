import Chemical, { ChemicalAttributes, ChemicalCreationAttributes } from "../../../database/models/formula/chemical";
import { GQLChemical, GQLChemicalId, GQLChemicalUpdate } from "../types";

const Mutation = {
  /**
   * Creates a new Target in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Target
   */
  createChemical: async (obj: any, { name, chemicalName, density }: ChemicalCreationAttributes): Promise<Chemical> => {
    const args: ChemicalCreationAttributes = {
      name: name || "Sans Nom",
      chemicalName: chemicalName || "",
      density: density || 1,
    };
    return await Chemical.create(args);
  },

  /**
   * Deletes Chemical in database
   * @param chemicalId the id of the Chemical to select
   */
  deleteChemical: async (obj: any, { chemicalId }: GQLChemicalId): Promise<boolean> => {
    const result = await Chemical.destroy({ where: { id: chemicalId } });
    return result > 0;
  },

  /**
   * Selects a Chemical by id and updates specified fields
   * @param targetId the id of the Chemical to select
   * @param args the fields to update
   * @return the updated Chemical or null if not in database
   */
  updateChemical: async (
    obj: any,
    { chemicalId, name, chemicalName, density }: GQLChemicalUpdate
  ): Promise<Chemical | null> => {
    const chemical = await Chemical.findOne({ where: { id: chemicalId } });
    if (chemical) {
      if (name) chemical.set({ name });
      if (chemicalName) chemical.set({ chemicalName });
      if (density) chemical.set({ density });
      return await chemical.save();
    }
    return null;
  },
};

export default Mutation;
