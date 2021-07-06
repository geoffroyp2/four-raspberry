import { Op, Order, WhereOptions } from "sequelize";
import Record, { RecordAttributes } from "../../../database/models/record/record";
import Target from "../../../database/models/target/target";
import { GQLRecordQuery, GQLRecordQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Records matching the filter
   * @param args research filters (id, name and oven)
   * Oven param does not work with pagination
   */
  records: async (
    _,
    { id, name, oven, finished, page, amount, sort }: GQLRecordQuery,
    { targetLoader }
  ): Promise<GQLRecordQueryRes> => {
    const args: WhereOptions<RecordAttributes> = {};
    if (name !== undefined) args.name = { [Op.iLike]: `%${name}%` };
    if (finished !== undefined) args.finished = finished;

    const order: Order = [];
    if (sort) {
      let direction = sort.order === "DESC" ? "DESC" : "ASC";
      switch (sort.sortBy) {
        case "id":
          order.push(["id", direction]);
          break;
        case "name":
        case "updatedAt":
        case "createdAt":
          order.push([sort.sortBy, direction], ["id", "ASC"]); // id always as second parameter
          break;
        default:
          order.push(["id", "ASC"]);
          break;
      }
    } else {
      order.push(["id", "ASC"]);
    }

    if (id === 0) {
      return Record.findAndCountAll({ where: args, order: [["id", "DESC"]], limit: 1 });
    } else {
      if (id) args.id = id;
      const records = await Record.findAndCountAll({
        where: args,
        order: order,
        limit: amount,
        offset: (amount || 0) * (page || 0),
      });

      if (oven === undefined && sort?.sortBy !== "oven" && sort?.sortBy !== "target") return records;

      // Look for the target of each record and keep the ones that match oven
      const filteredRecords: Record[] = [];
      const targets: { [id: number]: Target | undefined } = {};
      await Promise.all(
        records.rows.map(async (r) => {
          if (r.targetId) {
            const target = await targetLoader.load(r.targetId);
            if (target.oven === oven) filteredRecords.push(r);
            targets[r.id] = target;
          }
        })
      );

      if (oven)
        return {
          count: records.count,
          rows: filteredRecords,
        };

      const sortDirectionFactor = sort?.order === "DESC" ? -1 : 1;

      if (sort?.sortBy === "oven")
        return {
          count: records.count,
          rows: records.rows.sort((a, b) => {
            if (!targets[a.id] || !targets[b.id]) {
              if (!targets[b.id]) return 1 * sortDirectionFactor;
              return -1 * sortDirectionFactor;
            }
            return targets[a.id]!.oven.localeCompare(targets[b.id]!.oven) * sortDirectionFactor;
          }),
        };

      if (sort?.sortBy === "target")
        return {
          count: records.count,
          rows: records.rows.sort((a, b) => {
            if (!targets[a.id] || !targets[b.id]) {
              if (!targets[b.id]) return 1 * sortDirectionFactor;
              return -1 * sortDirectionFactor;
            }
            return targets[a.id]!.name.localeCompare(targets[b.id]!.name) * sortDirectionFactor;
          }),
        };

      return records;
    }
  },
};

export default Query;
