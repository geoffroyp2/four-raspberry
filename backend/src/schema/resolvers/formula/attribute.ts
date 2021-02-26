import Formula from "../../../database/models/formula/formula";
import Piece from "../../../database/models/piece/piece";

import { GQLGenericResearchFields, GQLIngredientType, ResolverObjectType } from "../types";

const Attribute: ResolverObjectType = {
  /**
   * @param parent the Formula
   * @param id id filter @param name name filter
   * @return the Pieces linked to the parent Formula
   */
  pieces: async (parent: Formula, { id, name }: GQLGenericResearchFields): Promise<Piece[]> => {
    // TODO: formulaPieceLoader ?
    const args: GQLGenericResearchFields = {};
    if (id) args.id = id;
    if (name) args.name = name;
    return parent.getPieces({ where: { ...args }, order: [["id", "ASC"]] });
  },

  /**
   * @param parent the Formula
   * @return the ingredients linked to the parent Formula
   */
  ingredients: async (parent: Formula): Promise<GQLIngredientType[]> => {
    // TODO: chemicalLoader ?

    const chemicals = await parent.getChemicals({ order: [["id", "ASC"]] });
    return chemicals.map((c) => ({
      amount: c.Ingredient!.amount,
      chemical: c,
    }));
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
