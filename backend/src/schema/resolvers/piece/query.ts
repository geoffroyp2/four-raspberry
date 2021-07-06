import { Op } from "sequelize";
import { WhereOptions } from "sequelize";
import Piece, { PieceAttributes } from "../../../database/models/piece/piece";
import { GQLPieceQuery, GQLPieceQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Pieces matching the filter
   * @param args research filters (id, name)
   */
  pieces: async (_, { id, name, amount, page }: GQLPieceQuery): Promise<GQLPieceQueryRes> => {
    const args: WhereOptions<PieceAttributes> = {};
    if (name !== undefined) args.name = { [Op.iLike]: `%${name}%` };

    if (id === 0) {
      return Piece.findAndCountAll({ where: args, order: [["id", "DESC"]], limit: 1 });
    } else {
      if (id) args.id = id;

      return await Piece.findAndCountAll({
        where: args,
        order: [["id", "ASC"]],
        limit: amount,
        offset: (amount || 0) * (page || 0),
      });
    }
  },
};

export default Query;
