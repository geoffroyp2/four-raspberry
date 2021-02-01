import { get, post } from "@db/client";

import { store } from "@src/redux/store";
import { loadPiece } from "@redux/dataReducers/pieceSlice";

import {
  PieceCreateType,
  PieceDeleteType,
  PieceFindFilter,
  PieceFindType,
  PieceFixType,
  PieceGetAllType,
  PieceLinkEditType,
  PieceSimpleEditType,
  LinkEditID,
  ReqID,
} from "@sharedTypes/dbAPITypes";

import { deleteInStore, updateStore } from "@reduxStore/dbDataEdit";

export const pieceMethods = {
  getAll: async (): Promise<void> => {
    const request: PieceGetAllType = {
      id: ReqID.getAll,
      data: null,
    };

    const data = await get(request, "piece");
    updateStore(data);
  },

  getMany: async (filter: PieceFindFilter): Promise<void> => {
    const request: PieceFindType = {
      id: ReqID.getMany,
      data: filter,
    };

    const data = await get(request, "piece");
    updateStore(data);
  },

  getOne: async (filter: PieceFindFilter): Promise<void> => {
    const request: PieceFindType = {
      id: ReqID.getOne,
      data: filter,
    };

    const data = await get(request, "piece");
    updateStore(data);
  },

  createOne: async (): Promise<void> => {
    const request: PieceCreateType = {
      id: ReqID.createOne,
      data: null,
    };

    const data = await get(request, "piece");

    updateStore(data);
    // select new element
    if (data.piece) {
      store.dispatch(loadPiece(data.piece[0]));
    }
  },

  deleteSelected: async (): Promise<void> => {
    const currentPieceID = store.getState().piece.selected._id;

    const request: PieceDeleteType = {
      id: ReqID.deleteOne,
      data: currentPieceID,
    };

    const data = await get(request, "piece");
    updateStore(data);
    deleteInStore(currentPieceID, "piece");
  },

  updateSimple: async (): Promise<void> => {
    const currentPiece = store.getState().piece.selected;

    const request: PieceSimpleEditType = {
      id: ReqID.updateSimple,
      data: {
        id: currentPiece._id,
        filter: {
          name: currentPiece.name,
          description: currentPiece.description,
          images: [...currentPiece.images],
          date: currentPiece.date,
        },
      },
    };

    const data = await post(request, "piece");
    updateStore(data);
  },

  addRecord: async (recordID: string) => {
    const currentPieceID = store.getState().piece.selected._id;

    const request: PieceLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.addElement,
        filter: {
          pieceID: currentPieceID,
          recordID: recordID,
        },
      },
    };

    const data = await post(request, "piece");
    updateStore(data);
  },

  removeRecord: async (recordID: string) => {
    const currentPieceID = store.getState().piece.selected._id;

    const request: PieceLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.removeElement,
        filter: {
          pieceID: currentPieceID,
          recordID: recordID,
        },
      },
    };

    const data = await post(request, "piece");
    updateStore(data);
  },

  changeFormula: async (formulaID: string) => {
    const currentPieceID = store.getState().piece.selected._id;

    const request: PieceLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.changeLink,
        filter: {
          pieceID: currentPieceID,
          formulaID: formulaID,
        },
      },
    };

    const data = await post(request, "piece");
    updateStore(data);
  },

  fixLinks: async (id: string): Promise<void> => {
    const request: PieceFixType = {
      id: ReqID.fixLinks,
      data: id,
    };

    const data = await get(request, "piece");
    updateStore(data);
  },
};
