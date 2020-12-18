import { store } from "@src/redux/store";
import { updatePiece } from "@redux/dataReducers/dbDataSlice";

import {
  ReqID,
  FormulaFindType,
  FormulaFindFilter,
  FormulaGetAllType,
  FormulaCreateType,
  FormulaDeleteType,
  FormulaEditType,
  PieceEditType,
} from "@sharedTypes/dbAPITypes";
import { Formula, Piece } from "@sharedTypes/dbModelTypes";

import { get, post } from "../client";

export const formulaMethods = {
  getAll: async (): Promise<Formula[]> => {
    const req: FormulaGetAllType = {
      id: ReqID.getAll,
      data: null,
    };
    return get<Formula>(req, "formula").then((data) => data);
  },

  getMany: async (filter: FormulaFindFilter): Promise<Formula[]> => {
    const req: FormulaFindType = {
      id: ReqID.getMany,
      data: filter,
    };
    return get<Formula>(req, "formula").then((data) => data);
  },

  getOne: async (filter: FormulaFindFilter): Promise<Formula> => {
    const req: FormulaFindType = {
      id: ReqID.getOne,
      data: filter,
    };
    return get<Formula>(req, "formula").then((data) => data[0]);
  },

  createOne: async (): Promise<Formula> => {
    const req: FormulaCreateType = {
      id: ReqID.createOne,
      data: null,
    };
    return get<Formula>(req, "formula").then((data) => data[0]);
  },

  deleteOne: async (id: string): Promise<void> => {
    const { piece, formula } = store.getState().dbData;

    // unlink pieces
    formula[id].pieces.forEach(async (p) => {
      const req: PieceEditType = {
        id: ReqID.updateOne,
        data: {
          id: piece[p]._id,
          filter: { ...piece[p], formula: "" },
        },
      };
      await get<Piece>(req, "piece").then((res) => {
        store.dispatch(updatePiece(res[0]));
      });
    });

    // delete formula
    const req: FormulaDeleteType = {
      id: ReqID.deleteOne,
      data: {
        _id: id,
      },
    };
    return get<Formula>(req, "formula").then();
  },

  updateOne: async (formula: Formula): Promise<Formula> => {
    const req: FormulaEditType = {
      id: ReqID.updateOne,
      data: {
        id: formula._id,
        filter: { ...formula },
      },
    };
    return post<Formula>(req, "formula").then((data) => data[0]);
  },
};
