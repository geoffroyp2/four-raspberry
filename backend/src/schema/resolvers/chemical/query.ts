import Chemical, { ChemicalAttributes } from "../../../database/models/formula/chemical";
import { GQLChemcicalFind, GQLChemicalQuery, GQLChemicalQueryRes } from "../types";

const Query = {
  /**
   * @return all Chemicals matching the filter
   * @param args research filters (id, name and chemicalName)
   */
  chemicals: async (
    obj: any,
    { id, name, chemicalName, amount, page }: GQLChemicalQuery
  ): Promise<GQLChemicalQueryRes> => {
    const args: GQLChemcicalFind = {};
    if (id) args.id = id;
    if (name) args.name = name;
    if (chemicalName) args.chemicalName = chemicalName;
    return await Chemical.findAndCountAll({
      where: args,
      order: [["id", "ASC"]],
      limit: amount,
      offset: (amount || 0) * (page || 0),
    });
  },
};

export default Query;
