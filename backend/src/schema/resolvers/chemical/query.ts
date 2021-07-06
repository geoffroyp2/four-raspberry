import { Op, Order } from "sequelize";
import { WhereOptions } from "sequelize/types";
import Chemical, { ChemicalAttributes } from "../../../database/models/formula/chemical";
import { GQLChemicalFind, GQLChemicalQuery, GQLChemicalQueryRes, ResolverObjectType } from "../types";

const Query: ResolverObjectType = {
  /**
   * @return all Chemicals matching the filter
   * @param args research filters (id, name and chemicalName)
   */
  chemicals: async (_, { id, name, chemicalName, amount, page, sort }: GQLChemicalQuery): Promise<GQLChemicalQueryRes> => {
    const args: WhereOptions<ChemicalAttributes> = {};
    if (chemicalName !== undefined) args.chemicalName = { [Op.iLike]: `%${chemicalName}%` };
    if (name !== undefined) args.name = { [Op.iLike]: `%${name}%` };
    if (id !== undefined) args.id = id;

    const order: Order = [];
    if (sort) {
      let direction = sort?.order === "DESC" ? "DESC" : "ASC";
      switch (sort?.sortBy) {
        case "id":
          order.push(["id", direction]);
          break;
        case "name":
        case "chemicalName":
        case "updatedAt":
        case "createdAt":
          order.push([sort.sortBy, direction], ["id", "ASC"]); // id always as second parameter
          break;
        default:
          order.push(["id", "ASC"]);
          break;
      }
    } else {
      order.push(["id", "ASC"]);
    }

    return Chemical.findAndCountAll({
      where: args,
      order: order,
      limit: amount,
      offset: (amount || 0) * (page || 0),
    });
  },
};

export default Query;
