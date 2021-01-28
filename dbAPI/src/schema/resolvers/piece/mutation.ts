import Piece from "../../../database/models/piece/model";
import { PieceAttributes } from "../../../database/models/piece/types";

const Mutation = {
  createPiece: async (obj: any, args: PieceAttributes) => {
    return await Piece.create();
  },

  deletePiece: async (obj: any, args: PieceAttributes) => {
    const result = await Piece.destroy({ where: args });
    return result > 0;
  },

  updatePiece: async (obj: any, { id, name, description }: PieceAttributes) => {
    const piece = await Piece.findOne({ where: { id } });
    if (piece) {
      if (name) piece.set({ name });
      if (description) piece.set({ description });
      return await piece.save();
    }
    return null;
  },
};

export default Mutation;
