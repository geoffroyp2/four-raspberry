import { get, post } from "@db/client";

import { store } from "@src/redux/store";
import { loadReference } from "@redux/dataReducers/referenceSlice";

import {
  ReferenceCreateType,
  ReferenceDeleteType,
  ReferenceFindFilter,
  ReferenceFindType,
  ReferenceFixType,
  ReferenceGetAllType,
  ReferenceSimpleEditType,
  ReqID,
} from "@sharedTypes/dbAPITypes";

import { deleteInStore, updateStore } from "@reduxStore/dbDataEdit";

export const referenceMethods = {
  getAll: async (): Promise<void> => {
    const request: ReferenceGetAllType = {
      id: ReqID.getAll,
      data: null,
    };

    const data = await get(request, "reference");
    updateStore(data);
  },

  getMany: async (filter: ReferenceFindFilter): Promise<void> => {
    const request: ReferenceFindType = {
      id: ReqID.getMany,
      data: filter,
    };

    const data = await get(request, "reference");
    updateStore(data);
  },

  getOne: async (filter: ReferenceFindFilter): Promise<void> => {
    const request: ReferenceFindType = {
      id: ReqID.getOne,
      data: filter,
    };

    const data = await get(request, "reference");
    updateStore(data);
  },

  createOne: async (): Promise<void> => {
    const request: ReferenceCreateType = {
      id: ReqID.createOne,
      data: null,
    };

    const data = await get(request, "reference");

    updateStore(data);
    // select new element
    if (data.reference) {
      store.dispatch(loadReference(data.reference[0]));
    }
  },

  deleteSelected: async (): Promise<void> => {
    const currentReferenceID = store.getState().reference.selected._id;

    const request: ReferenceDeleteType = {
      id: ReqID.deleteOne,
      data: currentReferenceID,
    };

    const data = await get(request, "reference");
    updateStore(data);
    deleteInStore(currentReferenceID, "reference");
  },

  updateSimple: async (): Promise<void> => {
    const currentReference = store.getState().reference.selected;

    const request: ReferenceSimpleEditType = {
      id: ReqID.updateSimple,
      data: {
        id: currentReference._id,
        filter: {
          name: currentReference.name,
          description: currentReference.description,
          color: { ...currentReference.color },
          points: [...currentReference.points].sort((a, b) => a.x - b.x),
        },
      },
    };

    const data = await post(request, "reference");
    updateStore(data);
  },

  fixLinks: async (id: string): Promise<void> => {
    const request: ReferenceFixType = {
      id: ReqID.fixLinks,
      data: id,
    };

    const data = await get(request, "reference");
    updateStore(data);
  },
};
