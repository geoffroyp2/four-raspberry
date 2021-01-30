import Formula from "../../../database/models/formula/formula";
import Piece from "../../../database/models/piece/piece";

import { GQLGenericResearchFields, GQLIngredientType } from "../types";

const Attribute = {
  /**
   * @param parent the Formula
   * @param id id filter @param name name filter
   * @return the Pieces linked to the parent Formula
   */
  pieces: async (parent: Formula, { id, name }: GQLGenericResearchFields): Promise<Piece[]> => {
    const pieces = await parent.getPieces();
    return pieces
      .filter((e) => (id && e.id === id) || (name && e.name === name) || (!id && !name))
      .sort((a, b) => a.id - b.id);
  },

  /**
   * @param parent the Formula
   * @return the ingredients linked to the parent Formula
   */
  ingredients: async (parent: Formula): Promise<GQLIngredientType[]> => {
    const chemicals = await parent.getChemicals();
    return chemicals
      .map((c) => ({
        amount: c.Ingredient!.amount,
        chemical: c,
      }))
      .sort((a, b) => a.chemical.id - b.chemical.id);
  },

  /**
   * @param parent The Formula
   * @return the Formula's creation Date string
   */
  createdAt: (parent: Formula) => {
    return new Date(parent.createdAt).toISOString();
  },

  /**
   * @param parent The Formula
   * @return the Formula's update Date string
   */
  updatedAt: (parent: Formula) => {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Attribute;
