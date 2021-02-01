import { Color, Point } from "../../models/shared/types";
import { LinkEditID, ReqID, ReqType } from "../shared/reqTypes";

// Query to update value of simple fields

export interface RecordSimpleEditQuery {
  id: string;
  filter: RecordSimpleEditFilter;
}

export interface RecordSimpleEditFilter {
  name?: string;
  description?: string;
  color?: Color;
  points?: Point[];
  date?: string;
}

// Query to update fields that link to other elements in database

export interface RecordLinkEditQuery {
  id: LinkEditID;
  filter: RecordLinkEditFilter;
}

export interface RecordLinkEditFilter {
  recordID: string;
  referenceID?: string;
  pieceID?: string;
}

// Filter to find specific element

export interface RecordFindFilter {
  _id?: string;
  name?: string;
  description?: string;
  reference?: string;
}

// Generic Types

export type RecordSimpleEditType = ReqType<ReqID.updateSimple, RecordSimpleEditQuery>;
export type RecordLinkEditType = ReqType<ReqID.updateLink, RecordLinkEditQuery>;

export type RecordDeleteType = ReqType<ReqID.deleteOne, string>; // string: Record id
export type RecordFixType = ReqType<ReqID.fixLinks, string>; // string: Record id

export type RecordFindType = ReqType<ReqID.getMany | ReqID.getOne, RecordFindFilter>;
export type RecordGetAllType = ReqType<ReqID.getAll, null>;
export type RecordCreateType = ReqType<ReqID.createOne, null>;
