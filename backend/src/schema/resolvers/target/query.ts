import Target from "../../../database/models/target/target";
import { GQLGenericResearchFields, GQLTargetQuery, GQLTargetQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Targets matching the filter
   * @param args research filters (id and name)
   */
  targets: async (_, { id, name, page, amount }: GQLTargetQuery): Promise<GQLTargetQueryRes> => {
    const args: GQLGenericResearchFields = {};
    if (name) args.name = name;

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
