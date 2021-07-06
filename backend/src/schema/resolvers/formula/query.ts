import { Op, Order } from "sequelize";
import { WhereOptions } from "sequelize";
import Formula, { FormulaAttributes } from "../../../database/models/formula/formula";
import Target from "../../../database/models/target/target";
import { GQLFormulaQuery, GQLFormulaQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Formulas matching the filter
   * @param args research filters (id, name)
   */
  formulas: async (_, { id, name, amount, page, sort }: GQLFormulaQuery, { targetLoader }): Promise<GQLFormulaQueryRes> => {
    const args: WhereOptions<FormulaAttributes> = {};
    if (name) args.name = { [Op.iLike]: `%${name}%` };

    const order: Order = [];
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

    if (id === 0) {
      return Formula.findAndCountAll({ where: args, order: [["id", "DESC"]], limit: 1 });
    } else {
      if (id) args.id = id;

      const formulas = await Formula.findAndCountAll({
        where: args,
        order: order,
        limit: amount,
        offset: (amount || 0) * (page || 0),
      });

      if (sort.sortBy !== "target") return formulas;

      const targets: { [id: number]: Target | undefined } = {};
      await Promise.all(
        formulas.rows.map(async (f) => {
          if (f.targetId) {
            const target = await targetLoader.load(f.targetId);
            targets[f.id] = target;
          }
        })
      );

      const sortDirectionFactor = sort.order === "DESC" ? -1 : 1;

      return {
        count: formulas.count,
        rows: formulas.rows.sort((a, b) => {
          if (!targets[a.id] || !targets[b.id]) {
            if (!targets[b.id]) return 1 * sortDirectionFactor;
            return -1 * sortDirectionFactor;
          }
          return targets[a.id]!.name.localeCompare(targets[b.id]!.name) * sortDirectionFactor;
        }),
      };
    }
  },
};

export default Query;
