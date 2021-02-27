import Chemical from "../../../database/models/formula/chemical";
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
