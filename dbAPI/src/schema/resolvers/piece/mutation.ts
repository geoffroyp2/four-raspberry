import Formula from "../../../database/models/formula/formula";
import Piece, { PieceAttributes, PieceCreationAttributes } from "../../../database/models/piece/piece";

type PFIDType = {
  pieceId: { id: number };
  formulaId?: { id: number };
};

const Mutation = {
  createPiece: async (obj: any, args: PieceCreationAttributes) => {
    return await Piece.create(args);
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

  setPieceFormula: async (obj: any, { pieceId, formulaId }: PFIDType) => {
    const piece = await Piece.findOne({ where: pieceId });
    if (piece) {
      if (formulaId) {
        // if formulaId specified, find new formula and update
        const formula = await Formula.findOne({ where: formulaId });
        if (formula) {
          await formula.addPiece(piece);
          return await Piece.findOne({ where: pieceId });
        }
      } else {
        // if no formulaId, remove previous link if it exists
        if (piece.formulaId) {
          const formula = await Formula.findOne({ where: { id: piece.formulaId } });
          if (formula) {
            await formula.removePiece(piece);
            return await Piece.findOne({ where: pieceId });
          }
        }
      }
    }
    return null;
  },
};

export default Mutation;
