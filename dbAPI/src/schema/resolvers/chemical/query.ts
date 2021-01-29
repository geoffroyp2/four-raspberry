import Chemical, { ChemicalAttributes } from "../../../database/models/formula/chemical";

const Query = {
  chemicals: async (obj: any, args: ChemicalAttributes) => {
    return await Chemical.findAll({ where: args, order: [["id", "ASC"]] });
  },
};

export default Query;
