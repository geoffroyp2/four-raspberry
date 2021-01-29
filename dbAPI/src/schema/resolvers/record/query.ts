import Piece, { PieceAttributes } from "../../../database/models/piece/piece";

const Query = {
  pieces: async (obj: any, args: PieceAttributes) => {
    return await Piece.findAll({ where: args, order: [["id", "ASC"]] });
  },
};

export default Query;
