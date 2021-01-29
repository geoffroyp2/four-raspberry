import { ChemicalAttributes } from "../../../database/models/formula/chemical";
import Formula from "../../../database/models/formula/formula";
import { PieceAttributes } from "../../../database/models/piece/piece";

type GQLIngredient = {
  amount: number;
  chemical: ChemicalAttributes;
};

const Attribute = {
  pieces: async (parent: Formula, { id, name }: PieceAttributes) => {
    const pieces = await parent.getPieces();
    return pieces
      .filter((e) => (id && e.id === id) || (name && e.name === name) || (!id && !name))
      .sort((a, b) => a.id - b.id);
  },

  ingredients: async (parent: Formula): Promise<GQLIngredient[]> => {
    const chemicals = await parent.getChemicals();
    return chemicals
      .map((c) => ({
        amount: c.Ingredient!.amount,
        chemical: c,
      }))
      .sort((a, b) => a.chemical.id - b.chemical.id);
  },

  createdAt: (parent: Formula) => {
    return new Date(parent.createdAt).toISOString();
  },

  updatedAt: (parent: Formula) => {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Attribute;
