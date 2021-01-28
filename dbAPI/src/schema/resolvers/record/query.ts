import Piece from "../../../database/models/piece/model";
import { PieceAttributes } from "../../../database/models/piece/types";

const Query = {
  pieces: async (obj: any, args: PieceAttributes) => {
    return await Piece.findAll({ where: args });
  },
};

export default Query;
