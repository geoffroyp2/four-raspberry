import Formula from "../../../database/models/formula/formula";
import Piece from "../../../database/models/piece/piece";

import { GQLPiece, GQLPieceId, GQLPieceUpdate, GQLPieceFormula } from "../types";

const Mutation = {
  /**
   * Creates a new Piece in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Piece
   */
  createPiece: async (obj: any, args: GQLPiece): Promise<Piece> => {
    return await Piece.create(args);
  },

  /**
   * Deletes Piece in database
   * @param pieceId the id of the Piece to select
   */
  deletePiece: async (obj: any, { pieceId }: GQLPieceId): Promise<boolean> => {
    const result = await Piece.destroy({ where: { id: pieceId } });
    return result > 0;
  },

  /**
   * Selects a Piece by id and updates specified fields
   * @param recordId the id of the Piece to select
   * @param args the fields to update
   * @return the updated Piece or null if not in database
   */
  updatePiece: async (obj: any, { pieceId, name, description }: GQLPieceUpdate): Promise<Piece | null> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    if (piece) {
      if (name) piece.set({ name });
      if (description) piece.set({ description });
      return await piece.save();
    }
    return null;
  },

  /**
   * Links a Formula to a Piece
   * @param pieceId the id of the Piece to select
   * @param formulaId the id of the Formula to select, if undefined, remove existing link
   * @return the Piece or null if the Piece or the Formula does not exist
   */
  setPieceFormula: async (obj: any, { pieceId, formulaId }: GQLPieceFormula): Promise<Piece | null> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    if (piece) {
      if (formulaId) {
        // if formulaId specified, find new formula and update
        const formula = await Formula.findOne({ where: { id: formulaId } });
        if (formula) {
          await formula.addPiece(piece);
          return await Piece.findOne({ where: { id: pieceId } });
        }
      } else {
        // if no formulaId, remove previous link if it exists
        if (piece.formulaId) {
          const formula = await Formula.findOne({ where: { id: piece.formulaId } });
          if (formula) {
            await formula.removePiece(piece);
            return await Piece.findOne({ where: { id: pieceId } });
          }
        }
      }
    }
    return null;
  },
};

export default Mutation;
