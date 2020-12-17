import {
  ReqID,
  RecordFindType,
  RecordFindFilter,
  RecordGetAllType,
  RecordCreateType,
  RecordDeleteType,
  RecordEditType,
} from "@sharedTypes/dbAPITypes";
import { Record } from "@sharedTypes/dbModelTypes";
import { get, post } from "../client";

export const recordMethods = {
  getAll: async (): Promise<Record[]> => {
    const req: RecordGetAllType = {
      id: ReqID.getAll,
      data: null,
    };
    return get<Record>(req, "record").then((data) => data);
  },

  getMany: async (filter: RecordFindFilter): Promise<Record[]> => {
    const req: RecordFindType = {
      id: ReqID.getMany,
      data: filter,
    };
    return get<Record>(req, "record").then((data) => data);
  },

  getOne: async (filter: RecordFindFilter): Promise<Record> => {
    const req: RecordFindType = {
      id: ReqID.getOne,
      data: filter,
    };
    return get<Record>(req, "record").then((data) => data[0]);
  },

  createOne: async (): Promise<Record> => {
    const req: RecordCreateType = {
      id: ReqID.createOne,
      data: null,
    };
    return get<Record>(req, "record").then((data) => data[0]);
  },

  deleteOne: async (id: string): Promise<void> => {
    const req: RecordDeleteType = {
      id: ReqID.deleteOne,
      data: {
        _id: id,
      },
    };
    return get<Record>(req, "record").then();
  },

  updateOne: async (record: Record): Promise<Record> => {
    // remove unchangeable fields from the Record
    const filter: any = { ...record };
    delete filter["_id"];
    delete filter["lastUpdated"];

    const req: RecordEditType = {
      id: ReqID.updateOne,
      data: {
        id: record._id,
        filter: filter,
      },
    };
    return post<Record>(req, "record").then((data) => data[0]);
  },
};
