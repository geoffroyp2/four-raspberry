import { store } from "@src/redux/store";
import { updatePiece, updateReference } from "@redux/dataReducers/dbDataSlice";

import {
  ReqID,
  RecordFindType,
  RecordFindFilter,
  RecordGetAllType,
  RecordCreateType,
  RecordDeleteType,
  RecordEditType,
  ReferenceEditType,
  PieceEditType,
} from "@sharedTypes/dbAPITypes";
import { Piece, Record, Reference } from "@sharedTypes/dbModelTypes";

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
    const { record, reference, piece } = store.getState().dbData;

    // Unlink reference
    if (record[id].reference) {
      // TODO do all of that in the back-end
      const refID = record[id].reference;
      const req1: ReferenceEditType = {
        id: ReqID.updateOne,
        data: {
          id: refID,
          filter: {
            ...reference[refID],
            records: [...reference[refID].records].filter((r) => r !== id),
          },
        },
      };
      await get<Reference>(req1, "reference").then((res) => {
        store.dispatch(updateReference(res[0]));
      });
    }

    // Unlink pieces
    record[id].pieces.forEach(async (p) => {
      const req: PieceEditType = {
        id: ReqID.updateOne,
        data: {
          id: piece[p]._id,
          filter: { ...piece[p], records: piece[p].records.filter((r) => r !== id) },
        },
      };
      await get<Piece>(req, "piece").then((res) => {
        store.dispatch(updatePiece(res[0]));
      });
    });

    // delete record
    const req2: RecordDeleteType = {
      id: ReqID.deleteOne,
      data: {
        _id: id,
      },
    };
    return get<Record>(req2, "record").then();
  },

  updateOne: async (record: Record): Promise<Record> => {
    const req: RecordEditType = {
      id: ReqID.updateOne,
      data: {
        id: record._id,
        filter: { ...record },
      },
    };
    return post<Record>(req, "record").then((data) => data[0]);
  },
};
