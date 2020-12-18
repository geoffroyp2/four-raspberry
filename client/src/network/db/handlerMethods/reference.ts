import { store } from "@src/redux/store";
import { updateRecord } from "@redux/dataReducers/dbDataSlice";

import {
  ReqID,
  ReferenceFindType,
  ReferenceFindFilter,
  ReferenceGetAllType,
  ReferenceCreateType,
  ReferenceDeleteType,
  ReferenceEditType,
  RecordEditType,
} from "@sharedTypes/dbAPITypes";
import { Record, Reference } from "@sharedTypes/dbModelTypes";

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
    const { record, reference } = store.getState().dbData;

    // unlink Records
    reference[id].records.forEach(async (r) => {
      const req: RecordEditType = {
        id: ReqID.updateOne,
        data: {
          id: record[r]._id,
          filter: { ...record[r], reference: "" },
        },
      };
      await get<Record>(req, "record").then((res) => store.dispatch(updateRecord(res[0])));
    });

    // delete reference
    const req: ReferenceDeleteType = {
      id: ReqID.deleteOne,
      data: {
        _id: id,
      },
    };
    return get<Reference>(req, "reference").then();
  },

  updateOne: async (reference: Reference): Promise<Reference> => {
    const req: ReferenceEditType = {
      id: ReqID.updateOne,
      data: {
        id: reference._id,
        filter: { ...reference },
      },
    };
    return post<Reference>(req, "reference").then((data) => data[0]);
  },
};
