import Chemical from "../../../database/models/formula/chemical";
import Formula, { FormulaAttributes, FormulaCreationAttributes } from "../../../database/models/formula/formula";

interface ISelectType {
  formulaId: number;
  chemicalId: number;
}

interface IUpdateType extends ISelectType {
  amount?: number;
  newChemicalId?: number;
}

interface IAddType extends ISelectType {
  amount: number;
}

const Mutation = {
  createFormula: async (obj: any, args: FormulaCreationAttributes) => {
    return await Formula.create(args);
  },

  deleteFormula: async (obj: any, args: FormulaAttributes) => {
    const result = await Formula.destroy({ where: args });
    return result > 0;
  },

  updateFormula: async (obj: any, { id, name, description }: FormulaAttributes) => {
    const formula = await Formula.findOne({ where: { id } });
    if (formula) {
      if (name) formula.set({ name });
      if (description) formula.set({ description });
      return await formula.save();
    }
    return null;
  },

  updateFormulaIngredient: async (obj: any, { formulaId, chemicalId, amount, newChemicalId }: IUpdateType) => {
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

  addFormulaIngredient: async ({ formulaId, chemicalId, amount }: IAddType) => {
    const formula = await Formula.findOne({ where: { id: formulaId } });
    const chemical = await Chemical.findOne({ where: { id: chemicalId } });
    if (formula && chemical) {
      await formula.addChemical(chemical, { through: { amount } });
      return await Formula.findOne({ where: { id: formulaId } });
    }
    return null;
  },

  removeFormulaIngredient: async ({ formulaId, chemicalId }: ISelectType) => {
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
