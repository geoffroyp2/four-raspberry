import Formula from "../../../database/models/formula/formula";
import Piece, { PieceCreationAttributes } from "../../../database/models/piece/piece";
import { DataLoadersType } from "../../dataLoaders";

import { GQLPieceId, GQLPieceUpdate, GQLPieceFormula, ResolverObjectType } from "../types";

/**
 * clears the cache from the loaders that are linked to the id
 */
const clearPieceLoaders = async (loaders: DataLoadersType, pieceId: number, formulaId?: number) => {
  loaders.photoLoader.clear(pieceId);
  loaders.pieceRecordListLoader.clear(pieceId);

  const piece = await Piece.findOne({ where: { id: pieceId } });
  const records = await piece?.getRecords();
  if (records) {
    records.forEach((r) => {
      loaders.recordPieceListLoader.clear(r.id);
    });
  }

  if (piece?.formulaId) {
    loaders.formulaLoader.clear(piece.formulaId);
  }
  if (formulaId) {
    loaders.formulaLoader.clear(formulaId);
  }
};

const Mutation: ResolverObjectType = {
  /**
   * Creates a new Piece in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Piece
   */
  createPiece: async (_, { name, description }: PieceCreationAttributes): Promise<Piece> => {
    const args: PieceCreationAttributes = {
      name: name || "Sans Nom",
      description: description || "",
    };
    return Piece.create(args);
  },

  /**
   * Deletes Piece in database
   * @param pieceId the id of the Piece to select
   */
  deletePiece: async (_, { pieceId }: GQLPieceId, loaders): Promise<boolean> => {
    clearPieceLoaders(loaders, pieceId);
    const result = await Piece.destroy({ where: { id: pieceId } });
    return result > 0;
  },

  /**
   * Selects a Piece by id and updates specified fields
   * @param recordId the id of the Piece to select
   * @param args the fields to update
   * @return the updated Piece or null if not in database
   */
  updatePiece: async (_, { pieceId, name, description }: GQLPieceUpdate, loaders): Promise<Piece | null> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    if (piece) {
      clearPieceLoaders(loaders, pieceId);

      if (name) piece.set({ name });
      if (description) piece.set({ description });
      return piece.save();
    }
    return null;
  },

  /**
   * Links a Formula to a Piece
   * @param pieceId the id of the Piece to select
   * @param formulaId the id of the Formula to select, if undefined, remove existing link
   * @return the Piece or null if the Piece or the Formula does not exist
   */
  setPieceFormula: async (_, { pieceId, formulaId }: GQLPieceFormula, loaders): Promise<Piece | null> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    if (piece) {
      clearPieceLoaders(loaders, pieceId, formulaId);
      if (formulaId) {
        // if formulaId specified, find new formula and update
        const formula = await Formula.findOne({ where: { id: formulaId } });
        if (formula) {
          await formula.addPiece(piece);
          return Piece.findOne({ where: { id: pieceId } });
        }
      } else {
        // if no formulaId, remove previous link if it exists
        if (piece.formulaId) {
          const formula = await Formula.findOne({ where: { id: piece.formulaId } });
          if (formula) {
            await formula.removePiece(piece);
            return Piece.findOne({ where: { id: pieceId } });
          }
        }
      }
    }
    return null;
  },
};

export default Mutation;
