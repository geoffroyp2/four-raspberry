import { get, post } from "@db/client";

import { store } from "@src/redux/store";
import { loadRecord } from "@redux/dataReducers/recordSlice";

import {
  RecordCreateType,
  RecordDeleteType,
  RecordFindFilter,
  RecordFindType,
  RecordFixType,
  RecordGetAllType,
  RecordLinkEditType,
  RecordSimpleEditType,
  LinkEditID,
  ReqID,
} from "@sharedTypes/dbAPITypes";
import { Record } from "@sharedTypes/dbModelTypes";

import { deleteInStore, updateStore } from "./storeEdit";

export const recordMethods = {
  getAll: async (): Promise<void> => {
    const request: RecordGetAllType = {
      id: ReqID.getAll,
      data: null,
    };

    const data = await get(request, "record");
    updateStore(data);
  },

  getMany: async (filter: RecordFindFilter): Promise<void> => {
    const request: RecordFindType = {
      id: ReqID.getMany,
      data: filter,
    };

    const data = await get(request, "record");
    updateStore(data);
  },

  getOne: async (filter: RecordFindFilter): Promise<void> => {
    const request: RecordFindType = {
      id: ReqID.getOne,
      data: filter,
    };

    const data = await get(request, "record");
    updateStore(data);
  },

  createOne: async (): Promise<void> => {
    const request: RecordCreateType = {
      id: ReqID.createOne,
      data: null,
    };

    const data = await get(request, "record");

    updateStore(data);
    // select new element
    if (data.record) {
      store.dispatch(loadRecord(data.record[0]));
    }
  },

  deleteOne: async (id: string): Promise<void> => {
    const request: RecordDeleteType = {
      id: ReqID.deleteOne,
      data: id,
    };

    const data = await get(request, "record");
    updateStore(data);
    deleteInStore(id, "record");
  },

  updateSimple: async (record: Record): Promise<void> => {
    const request: RecordSimpleEditType = {
      id: ReqID.updateSimple,
      data: {
        id: record._id,
        filter: {
          name: record.name,
          description: record.description,
          color: { ...record.color },
          points: [...record.points],
          date: record.date,
        },
      },
    };

    const data = await post(request, "record");
    updateStore(data);
  },

  addPiece: async (recordID: string, pieceID: string) => {
    const request: RecordLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.addElement,
        filter: {
          recordID: recordID,
          pieceID: pieceID,
        },
      },
    };

    const data = await post(request, "record");
    updateStore(data);
  },

  removePiece: async (recordID: string, pieceID: string) => {
    const request: RecordLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.removeElement,
        filter: {
          recordID: recordID,
          pieceID: pieceID,
        },
      },
    };

    const data = await post(request, "record");
    updateStore(data);
  },

  changeReference: async (recordID: string, referenceID: string) => {
    const request: RecordLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.changeLink,
        filter: {
          recordID: recordID,
          referenceID: referenceID,
        },
      },
    };

    const data = await post(request, "record");
    updateStore(data);
  },

  fixLinks: async (id: string): Promise<void> => {
    const request: RecordFixType = {
      id: ReqID.fixLinks,
      data: id,
    };

    const data = await get(request, "record");
    updateStore(data);
  },
};
