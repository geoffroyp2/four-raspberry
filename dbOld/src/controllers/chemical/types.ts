import { ReqID, ReqType } from "../shared/reqTypes";

// Query to update value of simple fields

export interface ChemicalSimpleEditQuery {
  id: string;
  filter: ChemicalSimpleEditFilter;
}

export interface ChemicalSimpleEditFilter {
  name?: string;
  chemicalName?: string;
  mass?: number;
}

// Filter to find specific element

export interface ChemicalFindFilter {
  _id?: string;
  chemicalName?: string;
  mass?: number;
}

// Generic Types

export type ChemicalSimpleEditType = ReqType<ReqID.updateSimple, ChemicalSimpleEditQuery>;

export type ChemicalDeleteType = ReqType<ReqID.deleteOne, string>; // string: chemical ID
export type ChemicalFixType = ReqType<ReqID.fixLinks, string>; // string: chemical ID

export type ChemicalFindType = ReqType<ReqID.getMany | ReqID.getOne, ChemicalFindFilter>;
export type ChemicalGetAllType = ReqType<ReqID.getAll, null>;
export type ChemicalCreateType = ReqType<ReqID.createOne, null>;
