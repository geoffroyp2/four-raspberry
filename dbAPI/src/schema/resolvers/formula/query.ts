import Formula, { FormulaAttributes } from "../../../database/models/formula/formula";

const Query = {
  formulas: async (obj: any, args: FormulaAttributes) => {
    return await Formula.findAll({ where: args, order: [["id", "ASC"]] });
  },
};

export default Query;
