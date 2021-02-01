import Record from "../../../database/models/record/record";
import Target from "../../../database/models/target/target";
import { GQLGenericResearchFields, GQLRecordQuery, GQLRecordQueryRes } from "../types";

const Query = {
  /**
   * @return all Records matching the filter
   * @param args research filters (id, name and oven)
   * Oven param does not work with pagination
   */
  records: async (obj: any, { id, name, oven, page, amount }: GQLRecordQuery): Promise<GQLRecordQueryRes> => {
    const args: GQLGenericResearchFields = {};
    if (id) args.id = id;
    if (name) args.name = name;
    const records = await Record.findAndCountAll({
      where: args,
      order: [["id", "ASC"]],
      limit: amount,
      offset: (amount || 0) * (page || 0),
    });

    if (oven) {
      // Look for the target of each record and keep the ones that match oven
      const recTargets = await Promise.all(
        records.rows.map(async (r) => ({ t: await Target.findOne({ where: { id: r.targetId } }), r }))
      );

      return {
        count: records.count,
        rows: recTargets.filter((e) => e.t && e.t.oven === oven).map((e) => e.r),
      };
    }
    return records;
  },
};

export default Query;
