import Chemical from "../../../database/models/formula/chemical";
import Formula from "../../../database/models/formula/formula";

import {
  GQLFormula,
  GQLFormulaId,
  GQLFormulaUpdate,
  GQLIngredientAdd,
  GQLIngredientSelect,
  GQLIngredientUpdate,
} from "../types";

const Mutation = {
  /**
   * Creates a new Formula in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Formula
   */
  createFormula: async (obj: any, args: GQLFormula): Promise<Formula> => {
    return await Formula.create(args);
  },

  /**
   * Deletes Formula in database
   * @param formulaId the id of the Formula to select
   */
  deleteFormula: async (obj: any, { formulaId }: GQLFormulaId): Promise<boolean> => {
    const result = await Formula.destroy({ where: { id: formulaId } });
    return result > 0;
  },

  /**
   * Selects a Formula by id and updates specified fields
   * @param recordId the id of the Formula to select
   * @param args the fields to update
   * @return the updated Formula or null if not in database
   */
  updateFormula: async (obj: any, { formulaId, name, description }: GQLFormulaUpdate): Promise<Formula | null> => {
    const formula = await Formula.findOne({ where: { id: formulaId } });
    if (formula) {
      if (name) formula.set({ name });
      if (description) formula.set({ description });
      return await formula.save();
    }
    return null;
  },

  /**
   * Updates an Ingredient of a Formula
   * If newChemicalId is specified, change the Chemical
   * If amount is specified, change amount
   * @param formulaId the Formula id
   * @param chemicalId the existing Chemical id
   * @param newChemicalId the new Chemical id
   * @param amount the amount
   * @returns the updated Formula or null if not found
   */
  updateFormulaIngredient: async (
    obj: any,
    { formulaId, chemicalId, amount, newChemicalId }: GQLIngredientUpdate
  ): Promise<Formula | null> => {
    const formula = await Formula.findOne({ where: { id: formulaId } });
    const chemicals = await formula?.getChemicals({ where: { id: chemicalId } });

    if (formula && chemicals && chemicals.length > 0) {
      const chemical = chemicals[0];
      if (newChemicalId) {
        const newChemical = await Chemical.findOne({ where: { id: newChemicalId } });
        if (newChemical) {
          const newAmount = amount || chemical.Ingredient?.amount;
          await formula.removeChemical(chemical);
          await formula.addChemical(newChemical, { through: { amount: newAmount } });
          return await Formula.findOne({ where: { id: formulaId } });
        }
      } else {
        if (amount && chemical.Ingredient) {
          chemical.Ingredient.set({ amount: amount });
          await chemical.Ingredient.save();
          return await Formula.findOne({ where: { id: formulaId } });
        }
      }
    }
    return null;
  },

  /**
   * Selects a Formula and a chemical by id and change the amount
   * @param formulaId the Formula id
   * @param chemicalId the existing Chemical id
   * @param amount the amount
   * @returns the updated Formula or null if not found
   */
  addFormulaIngredient: async ({ formulaId, chemicalId, amount }: GQLIngredientAdd): Promise<Formula | null> => {
    const formula = await Formula.findOne({ where: { id: formulaId } });
    const chemical = await Chemical.findOne({ where: { id: chemicalId } });
    if (formula && chemical) {
      await formula.addChemical(chemical, { through: { amount } });
      return await Formula.findOne({ where: { id: formulaId } });
    }
    return null;
  },

  /**
   * Selects a Formula and a chemical by id and remove the link between the 2
   * @param formulaId the Formula id
   * @param chemicalId the existing Chemical id
   *    * @returns the updated Formula or null if not found
   */
  removeFormulaIngredient: async ({ formulaId, chemicalId }: GQLIngredientSelect): Promise<Formula | null> => {
    const formula = await Formula.findOne({ where: { id: formulaId } });
    const chemicals = await formula?.getChemicals({ where: { id: chemicalId } });
    if (formula && chemicals && chemicals.length > 0) {
      const chemical = chemicals[0];
      await formula.removeChemical(chemical);
      return await Formula.findOne({ where: { id: formulaId } });
    }
    return null;
  },
};

export default Mutation;
