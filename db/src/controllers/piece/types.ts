import { LinkEditID, ReqID, ReqType } from "../shared/reqTypes";

// Query to update value of simple fields

export interface PieceSimpleEditQuery {
  id: string;
  filter: PieceSimpleEditFilter;
}

export interface PieceSimpleEditFilter {
  name?: string;
  description?: string;
  images?: string[];
  date?: string;
}

// Query to update fields that link to other elements in database

export interface PieceLinkEditQuery {
  id: LinkEditID;
  filter: PieceLinkEditFilter;
}

export interface PieceLinkEditFilter {
  pieceID: string;
  recordID?: string;
  formulaID?: string;
}

// Filter to find specific element

export interface PieceFindFilter {
  _id?: string;
  name?: string;
  description?: string;
}

// Generic Types

export type PieceSimpleEditType = ReqType<ReqID.updateSimple, PieceSimpleEditQuery>;
export type PieceLinkEditType = ReqType<ReqID.updateLink, PieceLinkEditQuery>;

export type PieceDeleteType = ReqType<ReqID.deleteOne, string>; // string: piece ID
export type PieceFixType = ReqType<ReqID.fixLinks, string>; // string: piece ID

export type PieceFindType = ReqType<ReqID.getMany | ReqID.getOne, PieceFindFilter>;
export type PieceGetAllType = ReqType<ReqID.getAll, null>;
export type PieceCreateType = ReqType<ReqID.createOne, null>;
