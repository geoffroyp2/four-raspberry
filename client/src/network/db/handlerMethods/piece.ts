import {
  ReqID,
  PieceFindType,
  PieceFindFilter,
  PieceGetAllType,
  PieceCreateType,
  PieceDeleteType,
  PieceEditFilter,
  PieceEditType,
} from "@sharedTypes/dbAPITypes";
import { Piece } from "@sharedTypes/dbModelTypes";
import { get } from "../client";

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
  updateOne: async (id: string, filter: PieceEditFilter["filter"]): Promise<Piece> => {
    const req: PieceEditType = {
      id: ReqID.updateOne,
      data: {
        id: id,
        filter: filter,
      },
    };
    return get<Piece>(req, "piece").then((data) => data[0]);
  },
};
