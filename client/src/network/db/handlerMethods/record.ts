import {
  ReqID,
  RecordFindType,
  RecordFindFilter,
  RecordGetAllType,
  RecordCreateType,
  RecordDeleteType,
  RecordEditFilter,
  RecordEditType,
} from "@sharedTypes/dbAPITypes";
import { Record } from "@sharedTypes/dbModelTypes";
import { get } from "../client";

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
  updateOne: async (id: string, filter: RecordEditFilter["filter"]): Promise<Record> => {
    const req: RecordEditType = {
      id: ReqID.updateOne,
      data: {
        id: id,
        filter: filter,
      },
    };
    return get<Record>(req, "record").then((data) => data[0]);
  },
};
