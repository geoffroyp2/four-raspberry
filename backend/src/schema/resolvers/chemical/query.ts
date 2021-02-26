import Chemical, { ChemicalAttributes } from "../../../database/models/formula/chemical";
import { GQLChemicalFind, GQLChemicalQuery, GQLChemicalQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Chemicals matching the filter
   * @param args research filters (id, name and chemicalName)
   */
  chemicals: async (_, { id, name, chemicalName, amount, page }: GQLChemicalQuery): Promise<GQLChemicalQueryRes> => {
    const args: GQLChemicalFind = {};
    if (chemicalName) args.chemicalName = chemicalName;
    if (name) args.name = name;

    if (id === 0) {
      return Chemical.findAndCountAll({ where: args, order: [["id", "DESC"]], limit: 1 });
    } else {
      if (id) args.id = id;
      return await Chemical.findAndCountAll({
        where: args,
        order: [["id", "ASC"]],
        limit: amount,
        offset: (amount || 0) * (page || 0),
      });
    }
  },
};

export default Query;
