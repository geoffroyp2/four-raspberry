import Record from "../../../database/models/record/record";
import Target from "../../../database/models/target/target";
import { GQLGenericResearchFields, GQLRecordQuery, GQLRecordQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Records matching the filter
   * @param args research filters (id, name and oven)
   * Oven param does not work with pagination
   */
  records: async (
    _,
    { id, name, oven, page, amount }: GQLRecordQuery,
    { targetLoader }
  ): Promise<GQLRecordQueryRes> => {
    const args: GQLGenericResearchFields = {};
    if (name) args.name = name;

    if (id === 0) {
      return Record.findAndCountAll({ where: args, order: [["id", "DESC"]], limit: 1 });
    } else {
      if (id) args.id = id;
      const records = await Record.findAndCountAll({
        where: args,
        order: [["id", "ASC"]],
        limit: amount,
        offset: (amount || 0) * (page || 0),
      });

      if (oven) {
        // Look for the target of each record and keep the ones that match oven
        const filteredRecords: Record[] = [];
        await Promise.all(
          records.rows.map(async (r) => {
            if (r.targetId) {
              const target = await targetLoader.load(r.targetId);
              if (target.oven === oven) filteredRecords.push(r);
            }
          })
        );

        return {
          count: records.count,
          rows: filteredRecords,
        };
      }
      return records;
    }
  },
};

export default Query;
