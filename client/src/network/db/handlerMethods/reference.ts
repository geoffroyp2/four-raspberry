import {
  ReqID,
  ReferenceFindType,
  ReferenceFindFilter,
  ReferenceGetAllType,
  ReferenceCreateType,
  ReferenceDeleteType,
  ReferenceEditType,
} from "@sharedTypes/dbAPITypes";
import { Reference } from "@sharedTypes/dbModelTypes";
import { get, post } from "../client";

export const referenceMethods = {
  getAll: async (): Promise<Reference[]> => {
    const req: ReferenceGetAllType = {
      id: ReqID.getAll,
      data: null,
    };
    return get<Reference>(req, "reference").then((data) => data);
  },

  getMany: async (filter: ReferenceFindFilter): Promise<Reference[]> => {
    const req: ReferenceFindType = {
      id: ReqID.getMany,
      data: filter,
    };
    return get<Reference>(req, "reference").then((data) => data);
  },

  getOne: async (filter: ReferenceFindFilter): Promise<Reference> => {
    const req: ReferenceFindType = {
      id: ReqID.getOne,
      data: filter,
    };
    return get<Reference>(req, "reference").then((data) => data[0]);
  },

  createOne: async (): Promise<Reference> => {
    const req: ReferenceCreateType = {
      id: ReqID.createOne,
      data: null,
    };
    return get<Reference>(req, "reference").then((data) => data[0]);
  },

  deleteOne: async (id: string): Promise<void> => {
    const req: ReferenceDeleteType = {
      id: ReqID.deleteOne,
      data: {
        _id: id,
      },
    };
    return get<Reference>(req, "reference").then();
  },

  updateOne: async (reference: Reference): Promise<Reference> => {
    // remove unchangeable fields
    const filter: any = { ...reference };
    delete filter["_id"];
    delete filter["lastUpdated"];

    const req: ReferenceEditType = {
      id: ReqID.updateOne,
      data: {
        id: reference._id,
        filter: filter,
      },
    };
    return post<Reference>(req, "reference").then((data) => data[0]);
  },
};
