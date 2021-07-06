import { Op, WhereOptions } from "sequelize";
import Record, { RecordAttributes } from "../../../database/models/record/record";
import { GQLRecordQuery, GQLRecordQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Records matching the filter
   * @param args research filters (id, name and oven)
   * Oven param does not work with pagination
   */
  records: async (
    _,
    { id, name, oven, finished, page, amount }: GQLRecordQuery,
    { targetLoader }
  ): Promise<GQLRecordQueryRes> => {
    const args: WhereOptions<RecordAttributes> = {};
    if (name !== undefined) args.name = { [Op.iLike]: `%${name}%` };
    if (finished !== undefined) args.finished = finished;

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
