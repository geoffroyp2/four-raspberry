import Piece from "../../../database/models/piece/piece";
import { GQLGenericResearchFields } from "../types";

const Query = {
  /**
   * @return all Pieces matching the filter
   * @param args research filters (id, name)
   */
  pieces: async (obj: any, args: GQLGenericResearchFields) => {
    return await Piece.findAll({ where: args, order: [["id", "ASC"]] });
  },
};

export default Query;
