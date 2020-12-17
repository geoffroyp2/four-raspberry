import {
  ReqID,
  PieceFindType,
  PieceFindFilter,
  PieceGetAllType,
  PieceCreateType,
  PieceDeleteType,
  PieceEditType,
} from "@sharedTypes/dbAPITypes";
import { Piece } from "@sharedTypes/dbModelTypes";
import { get, post } from "../client";

export const pieceMethods = {
  getAll: async (): Promise<Piece[]> => {
    const req: PieceGetAllType = {
      id: ReqID.getAll,
      data: null,
    };
    return get<Piece>(req, "piece").then((data) => data);
  },

  getMany: async (filter: PieceFindFilter): Promise<Piece[]> => {
    const req: PieceFindType = {
      id: ReqID.getMany,
      data: filter,
    };
    return get<Piece>(req, "piece").then((data) => data);
  },

  getOne: async (filter: PieceFindFilter): Promise<Piece> => {
    const req: PieceFindType = {
      id: ReqID.getOne,
      data: filter,
    };
    return get<Piece>(req, "piece").then((data) => data[0]);
  },

  createOne: async (): Promise<Piece> => {
    const req: PieceCreateType = {
      id: ReqID.createOne,
      data: null,
    };
    return get<Piece>(req, "piece").then((data) => data[0]);
  },

  deleteOne: async (id: string): Promise<void> => {
    const req: PieceDeleteType = {
      id: ReqID.deleteOne,
      data: {
        _id: id,
      },
    };
    return get<Piece>(req, "piece").then();
  },

  updateOne: async (piece: Piece): Promise<Piece> => {
    // remove unchangeable fields
    const filter: any = { ...piece };
    delete filter["_id"];
    delete filter["lastUpdated"];

    const req: PieceEditType = {
      id: ReqID.updateOne,
      data: {
        id: piece._id,
        filter: filter,
      },
    };
    return post<Piece>(req, "piece").then((data) => data[0]);
  },
};
