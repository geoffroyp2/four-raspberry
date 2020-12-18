import { store } from "@src/redux/store";
import { updateFormula, updateRecord } from "@redux/dataReducers/dbDataSlice";

import {
  ReqID,
  PieceFindType,
  PieceFindFilter,
  PieceGetAllType,
  PieceCreateType,
  PieceDeleteType,
  PieceEditType,
  RecordEditType,
  FormulaEditType,
} from "@sharedTypes/dbAPITypes";
import { Formula, Piece, Record } from "@sharedTypes/dbModelTypes";

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
    const { record, piece, formula } = store.getState().dbData;

    //unlink records
    piece[id].records.forEach(async (r) => {
      const req: RecordEditType = {
        id: ReqID.updateOne,
        data: {
          id: record[r]._id,
          filter: { ...record[r], pieces: [...record[r].pieces].filter((p) => p !== id) },
        },
      };
      await get<Record>(req, "record").then((res) => {
        store.dispatch(updateRecord(res[0]));
      });
    });

    //unlink formula
    if (piece[id].formula) {
      const formulaID = piece[id].formula;
      const req1: FormulaEditType = {
        id: ReqID.updateOne,
        data: {
          id: formulaID,
          filter: { ...formula[formulaID], pieces: [...formula[formulaID].pieces].filter((p) => p !== id) },
        },
      };
      await get<Formula>(req1, "formula").then((res) => {
        store.dispatch(updateFormula(res[0]));
      });
    }

    //Need to delete photos ?

    //delete Piece
    const req2: PieceDeleteType = {
      id: ReqID.deleteOne,
      data: {
        _id: id,
      },
    };
    return get<Piece>(req2, "piece").then();
  },

  updateOne: async (piece: Piece): Promise<Piece> => {
    const req: PieceEditType = {
      id: ReqID.updateOne,
      data: {
        id: piece._id,
        filter: { ...piece },
      },
    };
    return post<Piece>(req, "piece").then((data) => data[0]);
  },
};
