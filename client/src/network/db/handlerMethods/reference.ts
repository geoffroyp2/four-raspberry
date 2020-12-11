import {
  ReqID,
  ReferenceFindType,
  ReferenceFindFilter,
  ReferenceGetAllType,
  ReferenceCreateType,
  ReferenceDeleteType,
  ReferenceEditFilter,
  ReferenceEditType,
} from "@sharedTypes/dbAPITypes";
import { Reference } from "@sharedTypes/dbModelTypes";
import { get } from "../client";

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
  updateOne: async (id: string, filter: ReferenceEditFilter["filter"]): Promise<Reference> => {
    const req: ReferenceEditType = {
      id: ReqID.updateOne,
      data: {
        id: id,
        filter: filter,
      },
    };
    return get<Reference>(req, "reference").then((data) => data[0]);
  },
};
