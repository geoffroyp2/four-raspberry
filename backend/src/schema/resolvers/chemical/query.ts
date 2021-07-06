import { Op } from "sequelize";
import { WhereOptions } from "sequelize/types";
import Chemical, { ChemicalAttributes } from "../../../database/models/formula/chemical";
import { GQLChemicalFind, GQLChemicalQuery, GQLChemicalQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Chemicals matching the filter
   * @param args research filters (id, name and chemicalName)
   */
  chemicals: async (_, { id, name, chemicalName, amount, page }: GQLChemicalQuery): Promise<GQLChemicalQueryRes> => {
    const args: WhereOptions<ChemicalAttributes> = {};
    if (chemicalName !== undefined) args.chemicalName = { [Op.iLike]: `%${chemicalName}%` };
    if (name !== undefined) args.name = { [Op.iLike]: `%${name}%` };
    if (id !== undefined) args.id = id;

    return await Chemical.findAndCountAll({
      where: args,
      order: [["id", "ASC"]],
      limit: amount,
      offset: (amount || 0) * (page || 0),
    });
  },
};

export default Query;
