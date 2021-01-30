import Formula from "../../../database/models/formula/formula";
import { GQLGenericResearchFields } from "../types";

const Query = {
  /**
   * @return all Formulas matching the filter
   * @param args research filters (id, name)
   */
  formulas: async (obj: any, args: GQLGenericResearchFields) => {
    return await Formula.findAll({ where: args, order: [["id", "ASC"]] });
  },
};

export default Query;
