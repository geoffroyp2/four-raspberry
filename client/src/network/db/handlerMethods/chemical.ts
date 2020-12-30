import { get, post } from "@db/client";

import {
  ChemicalCreateType,
  ChemicalDeleteType,
  ChemicalFindFilter,
  ChemicalFindType,
  ChemicalFixType,
  ChemicalGetAllType,
  ChemicalSimpleEditType,
  ReqID,
} from "@sharedTypes/dbAPITypes";
import { Chemical } from "@sharedTypes/dbModelTypes";

import { deleteInStore, updateStore } from "./storeEdit";

export const chemicalMethods = {
  getAll: async (): Promise<void> => {
    const request: ChemicalGetAllType = {
      id: ReqID.getAll,
      data: null,
    };

    const data = await get(request, "chemical");
    updateStore(data);
  },

  getMany: async (filter: ChemicalFindFilter): Promise<void> => {
    const request: ChemicalFindType = {
      id: ReqID.getMany,
      data: filter,
    };

    const data = await get(request, "chemical");
    updateStore(data);
  },

  getOne: async (filter: ChemicalFindFilter): Promise<void> => {
    const request: ChemicalFindType = {
      id: ReqID.getOne,
      data: filter,
    };

    const data = await get(request, "chemical");
    updateStore(data);
  },

  createOne: async (): Promise<void> => {
    const request: ChemicalCreateType = {
      id: ReqID.createOne,
      data: null,
    };

    const data = await get(request, "chemical");
    updateStore(data); // no select needed
  },

  deleteOne: async (id: string): Promise<void> => {
    const request: ChemicalDeleteType = {
      id: ReqID.deleteOne,
      data: id,
    };

    const data = await get(request, "chemical");
    updateStore(data);
    deleteInStore(id, "chemical");
  },

  updateSimple: async (chemical: Chemical): Promise<void> => {
    const request: ChemicalSimpleEditType = {
      id: ReqID.updateSimple,
      data: {
        id: chemical._id,
        filter: {
          name: chemical.name,
          chemicalName: chemical.chemicalName,
          mass: chemical.mass,
        },
      },
    };

    const data = await post(request, "chemical");
    updateStore(data);
  },

  fixLinks: async (id: string): Promise<void> => {
    const request: ChemicalFixType = {
      id: ReqID.fixLinks,
      data: id,
    };

    const data = await get(request, "chemical");
    updateStore(data);
  },
};
