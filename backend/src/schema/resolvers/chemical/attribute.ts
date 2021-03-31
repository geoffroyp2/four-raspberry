import Chemical from "../../../database/models/formula/chemical";
import ChemicalVersion from "../../../database/models/formula/chemicalVersion";
import Formula from "../../../database/models/formula/formula";
import { stringToColor } from "../../../utils/strings";
import { ColorType, GQLGenericResearchFields, ResolverObjectType } from "../types";

const Attribute: ResolverObjectType = {
  /**
   * @param parent the Chemical
   * @param id id filter @param name name filter
   * @return the Formulas linked to the Parent Chemical
   */
  formulas: async (parent: Chemical, { id, name }: GQLGenericResearchFields): Promise<Formula[]> => {
    // TODO: chemicalFormulaLoader
    const args: GQLGenericResearchFields = {};
    if (id) args.id = id;
    if (name) args.name = name;
    const formulas = await parent.getFormulas({ where: { ...args }, order: [["id", "ASC"]] });
    return formulas;
  },

  /**
   * @param parent the parent Chemical
   * @returns the current ChemicalVersion name
   */
  currentVersion: async (parent: Chemical): Promise<String | null> => {
    // Could directly use parent.currentVersion but checking if it still exists in the database is maybe a good idea
    const version = await ChemicalVersion.findOne({ where: { chemicalId: parent.id, name: parent.currentVersion } });
    return version?.name || null;
  },

  /**
   *
   * @param parent the parent Chemical
   * @returns the list of all possible versions for that chemical
   */
  existingVersions: async (parent: Chemical, _, { versionLoader }): Promise<String[]> => {
    return versionLoader.load(parent.id);
  },

  /**
   * @param parent The Chemical
   * @return the Chemical's color {r, g, b, a}
   */
  color: (parent: Chemical): ColorType => {
    return stringToColor(parent.color);
  },

  /**
   * @param parent The Chemical
   * @return the Chemical's creation Date string
   */
  createdAt: (parent: Chemical) => {
    return new Date(parent.createdAt).toISOString();
  },

  /**
   * @param parent The Chemical
   * @return the Chemical's update Date string
   */
  updatedAt: (parent: Chemical) => {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Attribute;
