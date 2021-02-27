import Chemical, { ChemicalCreationAttributes } from "../../../database/models/formula/chemical";
import { colorToString } from "../../../utils/strings";
import { DataLoadersType } from "../../dataLoaders";
import { GQLChemical, GQLChemicalId, GQLChemicalUpdate, ResolverObjectType } from "../types";

const clearChemicalLoaders = (loaders: DataLoadersType, chemicalId: number) => {
  // TODO
};

const Mutation: ResolverObjectType = {
  /**
   * Creates a new Target in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Target
   */
  createChemical: async (_, { name, chemicalName, color, density }: Partial<GQLChemical>): Promise<Chemical> => {
    const args: ChemicalCreationAttributes = {
      name: name || "Sans Nom",
      chemicalName: chemicalName || "",
      color: colorToString(color),
      density: density || 1,
    };
    return Chemical.create(args);
  },

  /**
   * Deletes Chemical in database
   * @param chemicalId the id of the Chemical to select
   */
  deleteChemical: async (_, { chemicalId }: GQLChemicalId, loaders): Promise<boolean> => {
    clearChemicalLoaders(loaders, chemicalId);

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
    _,
    { chemicalId, name, chemicalName, density, color }: GQLChemicalUpdate,
    loaders
  ): Promise<Chemical | null> => {
    const chemical = await Chemical.findOne({ where: { id: chemicalId } });
    if (chemical) {
      clearChemicalLoaders(loaders, chemicalId);

      if (name) chemical.set({ name });
      if (chemicalName) chemical.set({ chemicalName });
      if (density) chemical.set({ density });
      if (color) chemical.set({ color: colorToString(color) });
      return chemical.save();
    }
    return null;
  },
};

export default Mutation;
