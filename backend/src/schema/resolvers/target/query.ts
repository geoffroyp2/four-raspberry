import Target from "../../../database/models/target/target";
import { GQLGenericResearchFields, GQLTargetQuery, GQLTargetQueryRes } from "../types";

const Query = {
  /**
   * @return all Targets matching the filter
   * @param args research filters (id and name)
   */
  targets: async (obj: any, { id, name, page, amount }: GQLTargetQuery): Promise<GQLTargetQueryRes> => {
    const args: GQLGenericResearchFields = {};
    if (id) args.id = id;
    if (name) args.name = name;
    return await Target.findAndCountAll({
      where: args,
      order: [["id", "ASC"]],
      limit: amount,
      offset: (amount || 0) * (page || 0),
    });
  },
};

export default Query;
