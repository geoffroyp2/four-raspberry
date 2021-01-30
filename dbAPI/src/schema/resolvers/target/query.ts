import Target, { TargetAttributes } from "../../../database/models/target/target";

const Query = {
  /**
   * @return all Targets matching the filter
   * @param args research filters (id and name)
   */
  targets: async (obj: any, args: TargetAttributes) => {
    return await Target.findAll({ where: args, order: [["id", "ASC"]] });
  },
};

export default Query;
