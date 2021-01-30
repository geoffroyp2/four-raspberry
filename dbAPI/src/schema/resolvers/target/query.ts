import Target from "../../../database/models/target/target";
import { GQLGenericResearchFields } from "../types";

const Query = {
  /**
   * @return all Targets matching the filter
   * @param args research filters (id and name)
   */
  targets: async (obj: any, args: GQLGenericResearchFields) => {
    return await Target.findAll({ where: args, order: [["id", "ASC"]] });
  },
};

export default Query;
