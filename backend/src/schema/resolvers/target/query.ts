import { Op } from "sequelize";
import { WhereOptions } from "sequelize";
import Target, { TargetAttributes } from "../../../database/models/target/target";
import { GQLTargetQuery, GQLTargetQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Targets matching the filter
   * @param args research filters (id and name)
   */
  targets: async (_, { id, name, page, amount }: GQLTargetQuery): Promise<GQLTargetQueryRes> => {
    const args: WhereOptions<TargetAttributes> = {};
    if (name !== undefined) args.name = { [Op.iLike]: `%${name}%` };

    if (id === 0) {
      return Target.findAndCountAll({ where: args, order: [["id", "DESC"]], limit: 1 });
    } else {
      if (id) args.id = id;
      return await Target.findAndCountAll({
        where: args,
        order: [["id", "ASC"]],
        limit: amount,
        offset: (amount || 0) * (page || 0),
      });
    }
  },
};

export default Query;
