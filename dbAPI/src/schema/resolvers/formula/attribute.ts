import { ChemicalAttributes } from "../../../database/models/formula/chemical";
import Formula from "../../../database/models/formula/formula";

type GQLIngredient = {
  amount: number;
  chemical: ChemicalAttributes;
};

const Attribute = {
  pieces: async (parent: Formula) => {
    return await parent.getPieces();
  },

  ingredients: async (parent: Formula): Promise<GQLIngredient[]> => {
    const chemicals = await parent.getChemicals();
    return chemicals.map((c) => ({
      amount: c.Ingredient!.amount,
      chemical: c,
    }));
  },
};

export default Attribute;
