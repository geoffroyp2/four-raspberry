import { Formula } from "../../models/formula/types";
import { ReqID, ReqType } from "../shared/reqTypes";
import { ResType } from "../shared/resTypes";

export interface FormulaEditFilter {
  id: string;
  filter: {
    name?: string;
    description?: string;
    composition?: { chem: string; amount: number }[];
  };
}

export interface FormulaDeleteFilter {
  _id: string;
}

export interface FormulaFindFilter {
  _id?: string;
}

export type FormulaEditType = ReqType<ReqID.updateOne, FormulaEditFilter>;
export type FormulaDeleteType = ReqType<ReqID.deleteOne, FormulaDeleteFilter>;
export type FormulaFindType = ReqType<ReqID.getMany | ReqID.getOne, FormulaFindFilter>;
export type FormulaGetAllType = ReqType<ReqID.getAll, null>;
export type FormulaCreateType = ReqType<ReqID.createOne, null>;

export type FormulaResType = ResType<Formula>;
