import Record from "../../../database/models/record/record";
import Target from "../../../database/models/target/target";
import { GQLGenericResearchFields, GQLRecordFind } from "../types";

const Query = {
  /**
   * @return all Records matching the filter
   * @param args research filters (id, name and oven)
   */
  records: async (obj: any, { id, name, oven }: GQLRecordFind) => {
    const args: GQLGenericResearchFields = {};
    if (id) args.id = id;
    if (name) args.name = name;
    const records = await Record.findAll({ where: args, order: [["id", "ASC"]] });

    if (oven) {
      // Look for the target of each record and keep the ones that match oven
      const results = await Promise.all(
        records.map(async (r) => ({ t: await Target.findOne({ where: { id: r.targetId } }), r }))
      );
      return results.filter((e) => e.t && e.t.oven === oven).map((e) => e.r);
    }
    return records;
  },
};

export default Query;
