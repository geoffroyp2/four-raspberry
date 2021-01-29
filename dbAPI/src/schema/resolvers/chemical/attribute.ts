import Chemical from "../../../database/models/formula/chemical";
import { FormulaAttributes } from "../../../database/models/formula/formula";

const Attribute = {
  formulas: async (parent: Chemical, { id, name }: FormulaAttributes) => {
    const formulas = await parent.getFormulas();
    return formulas
      .filter((e) => (id && e.id === id) || (name && e.name === name) || (!id && !name))
      .sort((a, b) => a.id - b.id);
  },

  createdAt: (parent: Chemical) => {
    return new Date(parent.createdAt).toISOString();
  },

  updatedAt: (parent: Chemical) => {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Attribute;
