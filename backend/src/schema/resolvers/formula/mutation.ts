import Chemical from "../../../database/models/formula/chemical";
import Formula, { FormulaCreationAttributes } from "../../../database/models/formula/formula";
import Target from "../../../database/models/target/target";
import { DataLoadersType } from "../../dataLoaders";

import {
  GQLFormula,
  GQLFormulaId,
  GQLFormulaTarget,
  GQLFormulaUpdate,
  GQLIngredientAdd,
  GQLIngredientSelect,
  GQLIngredientUpdate,
  ResolverObjectType,
} from "../types";

const clearFormulaLoaders = (loaders: DataLoadersType, formulaId: number, targetId?: number) => {
  loaders.formulaLoader.clearAll();
  loaders.targetLoader.clearAll();
  // loaders.formulaLoader.clear(formulaId);
};

const Mutation: ResolverObjectType = {
  /**
   * Creates a new Formula in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Formula
   */
  createFormula: async (_, { name, description }: FormulaCreationAttributes): Promise<Formula> => {
    const args: FormulaCreationAttributes = {
      name: name ?? "Sans Nom",
      description: description ?? "",
    };
    return Formula.create(args);
  },

  /**
   * Deletes Formula in database
   * @param formulaId the id of the Formula to select
   */
  deleteFormula: async (_, { formulaId }: GQLFormulaId, loaders): Promise<boolean> => {
    clearFormulaLoaders(loaders, formulaId);

    const result = await Formula.destroy({ where: { id: formulaId } });
    return result > 0;
  },

  /**
   * Selects a Formula by id and updates specified fields
   * @param recordId the id of the Formula to select
   * @param args the fields to update
   * @return the updated Formula or null if not in database
   */
  updateFormula: async (_, { formulaId, name, description }: GQLFormulaUpdate, loaders): Promise<Formula | null> => {
    const formula = await Formula.findOne({ where: { id: formulaId } });
    if (formula) {
      clearFormulaLoaders(loaders, formulaId);

      if (name !== undefined) formula.set({ name });
      if (description !== undefined) formula.set({ description });
      return formula.save();
    }
    return null;
  },

  /**
   * Links a Target to a Record
   * @param recordId the id of the Record to select
   * @param targetId the id of the Target to select, if undefined, remove existing link
   * @return the Record or null if the Record or the Target does not exist
   */
  setFormulaTarget: async (_, { formulaId, targetId }: GQLFormulaTarget, loaders): Promise<Formula | null> => {
    const formula = await Formula.findOne({ where: { id: formulaId } });
    if (formula) {
      clearFormulaLoaders(loaders, formulaId, targetId);

      if (targetId) {
        // if targetId specified, find new target and update
        const target = await Target.findOne({ where: { id: targetId } });
        if (target) {
          await target.addFormula(formula);
          return Formula.findOne({ where: { id: formulaId } });
        }
      } else {
        // if no targetId, remove previous link if it exists
        if (formula.targetId) {
          const target = await Target.findOne({ where: { id: formula.targetId } });
          if (target) {
            await target.removeFormula(formula);
            return Formula.findOne({ where: { id: formulaId } });
          }
        }
      }
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
    _,
    { formulaId, chemicalId, amount, newChemicalId }: GQLIngredientUpdate,
    loaders
  ): Promise<Formula | null> => {
    const formula = await Formula.findOne({ where: { id: formulaId } });
    const chemicals = await formula?.getChemicals({ where: { id: chemicalId } });

    if (formula && chemicals && chemicals.length > 0) {
      clearFormulaLoaders(loaders, formulaId);
      const chemical = chemicals[0];
      if (newChemicalId) {
        const newChemical = await Chemical.findOne({ where: { id: newChemicalId } });
        if (newChemical) {
          const newAmount = amount || chemical.Ingredient?.amount;
          await formula.removeChemical(chemical);
          await formula.addChemical(newChemical, { through: { amount: newAmount } });
          return Formula.findOne({ where: { id: formulaId } });
        }
      } else {
        if (amount && chemical.Ingredient) {
          chemical.Ingredient.set({ amount: amount });
          await chemical.Ingredient.save();
          return Formula.findOne({ where: { id: formulaId } });
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
  addFormulaIngredient: async ({ formulaId, chemicalId, amount }: GQLIngredientAdd, loaders): Promise<Formula | null> => {
    const formula = await Formula.findOne({ where: { id: formulaId } });
    const chemical = await Chemical.findOne({ where: { id: chemicalId } });
    if (formula && chemical) {
      clearFormulaLoaders(loaders, formulaId);
      await formula.addChemical(chemical, { through: { amount } });
      return Formula.findOne({ where: { id: formulaId } });
    }
    return null;
  },

  /**
   * Selects a Formula and a chemical by id and remove the link between the 2
   * @param formulaId the Formula id
   * @param chemicalId the existing Chemical id
   *    * @returns the updated Formula or null if not found
   */
  removeFormulaIngredient: async ({ formulaId, chemicalId }: GQLIngredientSelect, loaders): Promise<Formula | null> => {
    const formula = await Formula.findOne({ where: { id: formulaId } });
    const chemicals = await formula?.getChemicals({ where: { id: chemicalId } });
    if (formula && chemicals && chemicals.length > 0) {
      clearFormulaLoaders(loaders, formulaId);
      const chemical = chemicals[0];
      await formula.removeChemical(chemical);
      return Formula.findOne({ where: { id: formulaId } });
    }
    return null;
  },
};

export default Mutation;
