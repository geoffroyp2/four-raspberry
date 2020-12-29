import { Formula } from "../../models/formula/types";
import { ReqID, ReqType } from "../shared/reqTypes";
import { ResType } from "../shared/resTypes";

export interface FormulaEditQuery {
  id: string;
  filter: FormulaEditFilter;
}

export interface FormulaEditFilter {
  name?: string;
  description?: string;
  pieces?: string[];
  composition?: { id: string; amount: number }[];
}

export interface FormulaDeleteFilter {
  _id: string;
}

export interface FormulaFindFilter {
  _id?: string;
}

export type FormulaEditType = ReqType<ReqID.updateOne, FormulaEditQuery>;
export type FormulaDeleteType = ReqType<ReqID.deleteOne, FormulaDeleteFilter>;
export type FormulaFindType = ReqType<ReqID.getMany | ReqID.getOne, FormulaFindFilter>;
export type FormulaGetAllType = ReqType<ReqID.getAll, null>;
export type FormulaCreateType = ReqType<ReqID.createOne, null>;

export type FormulaResType = ResType<Formula>;
