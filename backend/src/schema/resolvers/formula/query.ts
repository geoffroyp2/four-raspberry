import Formula from "../../../database/models/formula/formula";
import { GQLFormulaQuery, GQLFormulaQueryRes, GQLGenericResearchFields } from "../types";

const Query = {
  /**
   * @return all Formulas matching the filter
   * @param args research filters (id, name)
   */
  formulas: async (obj: any, { id, name, amount, page }: GQLFormulaQuery): Promise<GQLFormulaQueryRes> => {
    const args: GQLGenericResearchFields = {};
    if (id) args.id = id;
    if (name) args.name = name;
    return await Formula.findAndCountAll({
      where: args,
      order: [["id", "ASC"]],
      limit: amount,
      offset: (amount || 0) * (page || 0),
    });
  },
};

export default Query;
