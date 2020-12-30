import { FormulaItem } from "../../models/formula/types";
import { LinkEditID, ReqID, ReqType } from "../shared/reqTypes";

// Query to update value of simple fields

export interface FormulaSimpleEditQuery {
  id: string;
  filter: FormulaSimpleEditFilter;
}

export interface FormulaSimpleEditFilter {
  name?: string;
  description?: string;
}

// Query to update fields that link to other elements in database

export interface FormulaLinkEditQuery {
  id: LinkEditID;
  filter: FormulaLinkEditFilter;
}

export interface FormulaLinkEditFilter {
  formulaID: string;
  formulaItem?: FormulaItem;
  chemicalID?: string;
}

// Filter to find specific element

export interface FormulaFindFilter {
  _id?: string;
  name?: string;
  description?: string;
}

// Generic Types

export type FormulaSimpleEditType = ReqType<ReqID.updateSimple, FormulaSimpleEditQuery>;
export type FormulaLinkEditType = ReqType<ReqID.updateLink, FormulaLinkEditQuery>;

export type FormulaDeleteType = ReqType<ReqID.deleteOne, string>; // string: formula id
export type FormulaFixType = ReqType<ReqID.fixLinks, string>; // string: formula id

export type FormulaFindType = ReqType<ReqID.getMany | ReqID.getOne, FormulaFindFilter>;
export type FormulaGetAllType = ReqType<ReqID.getAll, null>;
export type FormulaCreateType = ReqType<ReqID.createOne, null>;
