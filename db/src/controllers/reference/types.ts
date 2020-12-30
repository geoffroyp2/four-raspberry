import { Color, Point } from "../../models/shared/types";
import { ReqID, ReqType } from "../shared/reqTypes";

// Query to update value of simple fields

export interface ReferenceSimpleEditQuery {
  id: string;
  filter: ReferenceSimpleEditFilter;
}

export interface ReferenceSimpleEditFilter {
  name?: string;
  description?: string;
  color?: Color;
  points?: Point[];
}

// Filter to find specific element

export interface ReferenceFindFilter {
  _id?: string;
  name?: string;
  description?: string;
}

// Generic Types

export type ReferenceSimpleEditType = ReqType<ReqID.updateSimple, ReferenceSimpleEditQuery>;

export type ReferenceDeleteType = ReqType<ReqID.deleteOne, string>; // string: referenceID
export type ReferenceFixType = ReqType<ReqID.fixLinks, string>; // string: referenceID

export type ReferenceFindType = ReqType<ReqID.getMany | ReqID.getOne, ReferenceFindFilter>;
export type ReferenceGetAllType = ReqType<ReqID.getAll, null>;
export type ReferenceCreateType = ReqType<ReqID.createOne, null>;
