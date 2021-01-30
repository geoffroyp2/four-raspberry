import Chemical, { ChemicalAttributes } from "../../../database/models/formula/chemical";

const Query = {
  /**
   * @return all Chemicals matching the filter
   * @param args research filters (id, name and chemicalName)
   */
  chemicals: async (obj: any, args: ChemicalAttributes) => {
    return await Chemical.findAll({ where: args, order: [["id", "ASC"]] });
  },
};

export default Query;
