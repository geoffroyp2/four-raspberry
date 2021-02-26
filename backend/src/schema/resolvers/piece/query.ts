import Piece from "../../../database/models/piece/piece";
import { GQLGenericResearchFields, GQLPieceQuery, GQLPieceQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Pieces matching the filter
   * @param args research filters (id, name)
   */
  pieces: async (_, { id, name, amount, page }: GQLPieceQuery): Promise<GQLPieceQueryRes> => {
    const args: GQLGenericResearchFields = {};
    if (name) args.name = name;

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
