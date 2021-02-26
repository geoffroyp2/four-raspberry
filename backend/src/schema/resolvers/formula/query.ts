import Formula from "../../../database/models/formula/formula";
import { GQLFormulaQuery, GQLFormulaQueryRes, GQLGenericResearchFields, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Formulas matching the filter
   * @param args research filters (id, name)
   */
  formulas: async (_, { id, name, amount, page }: GQLFormulaQuery): Promise<GQLFormulaQueryRes> => {
    const args: GQLGenericResearchFields = {};
    if (name) args.name = name;

    if (id === 0) {
      return Formula.findAndCountAll({ where: args, order: [["id", "DESC"]], limit: 1 });
    } else {
      if (id) args.id = id;

      return await Formula.findAndCountAll({
        where: args,
        order: [["id", "ASC"]],
        limit: amount,
        offset: (amount || 0) * (page || 0),
      });
    }
  },
};

export default Query;
