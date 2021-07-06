import { Op } from "sequelize";
import { WhereOptions } from "sequelize";
import Formula, { FormulaAttributes } from "../../../database/models/formula/formula";
import { GQLFormulaQuery, GQLFormulaQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Formulas matching the filter
   * @param args research filters (id, name)
   */
  formulas: async (_, { id, name, amount, page }: GQLFormulaQuery): Promise<GQLFormulaQueryRes> => {
    const args: WhereOptions<FormulaAttributes> = {};
    if (name) args.name = { [Op.iLike]: `%${name}%` };

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
