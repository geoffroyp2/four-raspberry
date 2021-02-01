import Piece from "../../../database/models/piece/piece";
import { GQLGenericResearchFields, GQLPieceQuery, GQLPieceQueryRes } from "../types";

const Query = {
  /**
   * @return all Pieces matching the filter
   * @param args research filters (id, name)
   */
  pieces: async (obj: any, { id, name, amount, page }: GQLPieceQuery): Promise<GQLPieceQueryRes> => {
    const args: GQLGenericResearchFields = {};
    if (id) args.id = id;
    if (name) args.name = name;
    return await Piece.findAndCountAll({
      where: args,
      order: [["id", "ASC"]],
      limit: amount,
      offset: (amount || 0) * (page || 0),
    });
  },
};

export default Query;
