import {
  ReqID,
  ChemicalFindType,
  ChemicalFindFilter,
  ChemicalGetAllType,
  ChemicalCreateType,
  ChemicalDeleteType,
  ChemicalEditType,
} from "@sharedTypes/dbAPITypes";
import { Chemical } from "@sharedTypes/dbModelTypes";
import { get, post } from "../client";

export const chemicalMethods = {
  getAll: async (): Promise<Chemical[]> => {
    const req: ChemicalGetAllType = {
      id: ReqID.getAll,
      data: null,
    };
    return get<Chemical>(req, "chemical").then((data) => data);
  },

  getMany: async (filter: ChemicalFindFilter): Promise<Chemical[]> => {
    const req: ChemicalFindType = {
      id: ReqID.getMany,
      data: filter,
    };
    return get<Chemical>(req, "chemical").then((data) => data);
  },

  getOne: async (filter: ChemicalFindFilter): Promise<Chemical> => {
    const req: ChemicalFindType = {
      id: ReqID.getOne,
      data: filter,
    };
    return get<Chemical>(req, "chemical").then((data) => data[0]);
  },

  createOne: async (): Promise<Chemical> => {
    const req: ChemicalCreateType = {
      id: ReqID.createOne,
      data: null,
    };
    return get<Chemical>(req, "chemical").then((data) => data[0]);
  },

  deleteOne: async (id: string): Promise<void> => {
    const req: ChemicalDeleteType = {
      id: ReqID.deleteOne,
      data: {
        _id: id,
      },
    };
    return get<Chemical>(req, "chemical").then();
  },

  updateOne: async (chemical: Chemical): Promise<Chemical> => {
    // remove unchangeable fields
    const filter: any = { ...chemical };
    delete filter["_id"];
    delete filter["lastUpdated"];

    const req: ChemicalEditType = {
      id: ReqID.updateOne,
      data: {
        id: chemical._id,
        filter: filter,
      },
    };
    return post<Chemical>(req, "chemical").then((data) => data[0]);
  },
};
