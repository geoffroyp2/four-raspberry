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
import { Piece } from "@sharedTypes/dbModelTypes";

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

  deleteOne: async (id: string): Promise<void> => {
    const request: PieceDeleteType = {
      id: ReqID.deleteOne,
      data: id,
    };

    const data = await get(request, "piece");
    updateStore(data);
    deleteInStore(id, "piece");
  },

  updateSimple: async (piece: Piece): Promise<void> => {
    const request: PieceSimpleEditType = {
      id: ReqID.updateSimple,
      data: {
        id: piece._id,
        filter: {
          name: piece.name,
          description: piece.description,
          images: [...piece.images],
          date: piece.date,
        },
      },
    };

    const data = await post(request, "piece");
    updateStore(data);
  },

  addRecord: async (pieceID: string, recordID: string) => {
    const request: PieceLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.addElement,
        filter: {
          pieceID: pieceID,
          recordID: recordID,
        },
      },
    };

    const data = await post(request, "piece");
    updateStore(data);
  },

  removeRecord: async (pieceID: string, recordID: string) => {
    const request: PieceLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.removeElement,
        filter: {
          pieceID: pieceID,
          recordID: recordID,
        },
      },
    };

    const data = await post(request, "piece");
    updateStore(data);
  },

  changeFormula: async (pieceID: string, formulaID: string) => {
    const request: PieceLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.changeLink,
        filter: {
          pieceID: pieceID,
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
