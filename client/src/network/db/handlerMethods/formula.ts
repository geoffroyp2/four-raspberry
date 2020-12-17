import {
  ReqID,
  FormulaFindType,
  FormulaFindFilter,
  FormulaGetAllType,
  FormulaCreateType,
  FormulaDeleteType,
  FormulaEditType,
} from "@sharedTypes/dbAPITypes";
import { Formula } from "@sharedTypes/dbModelTypes";
import { get, post } from "../client";

export const formulaMethods = {
  getAll: async (): Promise<Formula[]> => {
    const req: FormulaGetAllType = {
      id: ReqID.getAll,
      data: null,
    };
    return get<Formula>(req, "formula").then((data) => data);
  },

  getMany: async (filter: FormulaFindFilter): Promise<Formula[]> => {
    const req: FormulaFindType = {
      id: ReqID.getMany,
      data: filter,
    };
    return get<Formula>(req, "formula").then((data) => data);
  },

  getOne: async (filter: FormulaFindFilter): Promise<Formula> => {
    const req: FormulaFindType = {
      id: ReqID.getOne,
      data: filter,
    };
    return get<Formula>(req, "formula").then((data) => data[0]);
  },

  createOne: async (): Promise<Formula> => {
    const req: FormulaCreateType = {
      id: ReqID.createOne,
      data: null,
    };
    return get<Formula>(req, "formula").then((data) => data[0]);
  },

  deleteOne: async (id: string): Promise<void> => {
    const req: FormulaDeleteType = {
      id: ReqID.deleteOne,
      data: {
        _id: id,
      },
    };
    return get<Formula>(req, "formula").then();
  },

  updateOne: async (formula: Formula): Promise<Formula> => {
    // remove unchangeable fields
    const filter: any = { ...formula };
    delete filter["_id"];
    delete filter["lastUpdated"];

    const req: FormulaEditType = {
      id: ReqID.updateOne,
      data: {
        id: formula._id,
        filter: filter,
      },
    };
    return post<Formula>(req, "formula").then((data) => data[0]);
  },
};
