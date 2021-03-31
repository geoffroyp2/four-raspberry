import Chemical, { ChemicalCreationAttributes } from "../../../database/models/formula/chemical";
import ChemicalVersion from "../../../database/models/formula/chemicalVersion";
import { colorToString } from "../../../utils/strings";
import { DataLoadersType } from "../../dataLoaders";
import { GQLChemical, GQLChemicalId, GQLChemicalUpdate, ResolverObjectType, GQLChemicalVersion } from "../types";

const clearChemicalLoaders = (loaders: DataLoadersType, chemicalId: number) => {
  loaders.formulaLoader.clearAll();
  loaders.versionLoader.clearAll();
};

const Mutation: ResolverObjectType = {
  /**
   * Creates a new Target in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Target
   */
  createChemical: async (_, { name, chemicalName, color }: Partial<GQLChemical>): Promise<Chemical> => {
    const args: ChemicalCreationAttributes = {
      name: name ?? "Sans Nom",
      chemicalName: chemicalName ?? "",
      currentVersion: "",
      color: colorToString(color),
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
  updateChemical: async (_, { chemicalId, name, chemicalName, color }: GQLChemicalUpdate, loaders): Promise<Chemical | null> => {
    const chemical = await Chemical.findOne({ where: { id: chemicalId } });
    if (chemical) {
      clearChemicalLoaders(loaders, chemicalId);

      if (name !== undefined) chemical.set({ name });
      if (chemicalName !== undefined) chemical.set({ chemicalName });
      if (color !== undefined) chemical.set({ color: colorToString(color) });
      return chemical.save();
    }
    return null;
  },

  /**
   * Adds a new version to the list for the Chemical
   * @param chemicalId the Chemical id
   * @param versionName the name for the new version
   * @returns the updated Chemical
   */
  addChemicalVersion: async (_, { chemicalId, versionName }: GQLChemicalVersion, loaders): Promise<Chemical | null> => {
    const chemical = await Chemical.findOne({ where: { id: chemicalId } });
    if (chemical) {
      clearChemicalLoaders(loaders, chemicalId);

      chemical.createVersion({ name: versionName });
      chemical.set({ currentVersion: versionName });
      return chemical.save();
    }
    return null;
  },

  /**
   * Deletes a version from the list for the Chemical
   * @param chemicalId the Chemical id
   * @param versionName the name of the version
   * @returns the updated Chemical
   */
  deleteChemicalVersion: async (_, { chemicalId, versionName }: GQLChemicalVersion, loaders): Promise<Chemical | null> => {
    const chemical = await Chemical.findOne({ where: { id: chemicalId } });
    if (chemical) {
      clearChemicalLoaders(loaders, chemicalId);

      const version = await ChemicalVersion.findOne({ where: { chemicalId, name: versionName } });
      if (version) {
        await version.destroy();
      }

      // If currentVersion was deleted, automatically reselect the first one in the list
      if (chemical.currentVersion === versionName) {
        const versions = await chemical.getVersions();
        chemical.set({ currentVersion: versions[0]?.name ?? "" });
        return chemical.save();
      }

      return chemical;
    }
    return null;
  },

  /**
   * Sets another version from the list for the Chemical (the name has to exist in the database)
   * Idea: merge with createChemicalVersion (setOrCreateChemicalVersion)
   * @param chemicalId the Chemical id
   * @param versionName the name for the new version
   * @returns the updated Chemical
   */
  setChemicalVersion: async (_, { chemicalId, versionName }: GQLChemicalVersion, loaders): Promise<Chemical | null> => {
    const chemical = await Chemical.findOne({ where: { id: chemicalId } });
    if (chemical) {
      clearChemicalLoaders(loaders, chemicalId);

      const version = await ChemicalVersion.findOne({ where: { chemicalId, name: versionName } });
      if (version) {
        chemical.set({ currentVersion: version.name });
        return chemical.save();
      }

      return chemical;
    }
    return null;
  },
};

export default Mutation;
