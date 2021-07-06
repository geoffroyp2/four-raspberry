import { Op, Order } from "sequelize";
import { WhereOptions } from "sequelize";
import Formula from "../../../database/models/formula/formula";
import Piece, { PieceAttributes } from "../../../database/models/piece/piece";
import { GQLPieceQuery, GQLPieceQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Pieces matching the filter
   * @param args research filters (id, name)
   */
  pieces: async (_, { id, name, amount, page, sort }: GQLPieceQuery, { formulaLoader }): Promise<GQLPieceQueryRes> => {
    const args: WhereOptions<PieceAttributes> = {};
    if (name !== undefined) args.name = { [Op.iLike]: `%${name}%` };

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
      return Piece.findAndCountAll({ where: args, order: [["id", "DESC"]], limit: 1 });
    } else {
      if (id) args.id = id;

      const pieces = await Piece.findAndCountAll({
        where: args,
        order: order,
        limit: amount,
        offset: (amount || 0) * (page || 0),
      });

      if (sort.sortBy !== "formula") return pieces;

      const formulas: { [id: number]: Formula | undefined } = {};
      await Promise.all(
        pieces.rows.map(async (p) => {
          if (p.formulaId) {
            const formula = await formulaLoader.load(p.formulaId);
            formulas[p.id] = formula;
          }
        })
      );

      const sortDirectionFactor = sort.order === "DESC" ? -1 : 1;

      return {
        count: pieces.count,
        rows: pieces.rows.sort((a, b) => {
          if (!formulas[a.id] || !formulas[b.id]) {
            if (!formulas[b.id]) return 1 * sortDirectionFactor;
            return -1 * sortDirectionFactor;
          }
          return formulas[a.id]!.name.localeCompare(formulas[b.id]!.name) * sortDirectionFactor;
        }),
      };
    }
  },
};

export default Query;
