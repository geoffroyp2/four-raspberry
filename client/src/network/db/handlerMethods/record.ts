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

import { deleteInStore, updateStore } from "@reduxStore/dbDataEdit";

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

  deleteSelected: async (): Promise<void> => {
    const currentRecordID = store.getState().record.selected._id;

    const request: RecordDeleteType = {
      id: ReqID.deleteOne,
      data: currentRecordID,
    };

    const data = await get(request, "record");
    updateStore(data);
    deleteInStore(currentRecordID, "record");
  },

  updateSimple: async (): Promise<void> => {
    const currentRecord = store.getState().record.selected;

    const request: RecordSimpleEditType = {
      id: ReqID.updateSimple,
      data: {
        id: currentRecord._id,
        filter: {
          name: currentRecord.name,
          description: currentRecord.description,
          color: { ...currentRecord.color },
          points: [...currentRecord.points].sort((a, b) => a.x - b.x),
          date: currentRecord.date,
        },
      },
    };

    const data = await post(request, "record");
    updateStore(data);
  },

  addPiece: async (pieceID: string) => {
    const currentRecordID = store.getState().record.selected._id;

    const request: RecordLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.addElement,
        filter: {
          recordID: currentRecordID,
          pieceID: pieceID,
        },
      },
    };

    const data = await post(request, "record");
    updateStore(data);
  },

  removePiece: async (pieceID: string) => {
    const currentRecordID = store.getState().record.selected._id;

    const request: RecordLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.removeElement,
        filter: {
          recordID: currentRecordID,
          pieceID: pieceID,
        },
      },
    };

    const data = await post(request, "record");
    updateStore(data);
  },

  changeReference: async (referenceID: string) => {
    const currentRecordID = store.getState().record.selected._id;

    const request: RecordLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.changeLink,
        filter: {
          recordID: currentRecordID,
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
