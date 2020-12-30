import { Chemical, Formula, Piece, Record, Reference, Color, Point, FormulaItem } from "./dbModelTypes";

// COMMON

export enum ReqID {
  getAll,
  getMany,
  getOne,
  deleteOne,
  createOne,
  updateSimple,
  updateLink,
  fixLinks,
}

export enum LinkEditID {
  changeLink,
  addElement,
  removeElement,
}

export interface ReqType<T, U> {
  id: T;
  data: U;
}

export interface ResDataType {
  chemical?: Chemical[];
  formula?: Formula[];
  piece?: Piece[];
  record?: Record[];
  reference?: Reference[];
}

export type AllGetAllType = ReqType<ReqID.getAll, null>;
export type AllFixType = ReqType<ReqID.fixLinks, null>;

// REFERENCE

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

export interface ReferenceFindFilter {
  _id?: string;
  name?: string;
  description?: string;
}

export type ReferenceSimpleEditType = ReqType<ReqID.updateSimple, ReferenceSimpleEditQuery>;
export type ReferenceDeleteType = ReqType<ReqID.deleteOne, string>; // string: referenceID
export type ReferenceFixType = ReqType<ReqID.fixLinks, string>; // string: referenceID
export type ReferenceFindType = ReqType<ReqID.getMany | ReqID.getOne, ReferenceFindFilter>;
export type ReferenceGetAllType = ReqType<ReqID.getAll, null>;
export type ReferenceCreateType = ReqType<ReqID.createOne, null>;

// RECORD

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

export interface RecordLinkEditQuery {
  id: LinkEditID;
  filter: RecordLinkEditFilter;
}

export interface RecordLinkEditFilter {
  recordID: string;
  referenceID?: string;
  pieceID?: string;
}

export interface RecordFindFilter {
  _id?: string;
  name?: string;
  description?: string;
  reference?: string;
}

export type RecordSimpleEditType = ReqType<ReqID.updateSimple, RecordSimpleEditQuery>;
export type RecordLinkEditType = ReqType<ReqID.updateLink, RecordLinkEditQuery>;
export type RecordDeleteType = ReqType<ReqID.deleteOne, string>; // string: Record id
export type RecordFixType = ReqType<ReqID.fixLinks, string>; // string: Record id
export type RecordFindType = ReqType<ReqID.getMany | ReqID.getOne, RecordFindFilter>;
export type RecordGetAllType = ReqType<ReqID.getAll, null>;
export type RecordCreateType = ReqType<ReqID.createOne, null>;

// PIECE

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

export interface PieceLinkEditQuery {
  id: LinkEditID;
  filter: PieceLinkEditFilter;
}

export interface PieceLinkEditFilter {
  pieceID: string;
  recordID?: string;
  formulaID?: string;
}

export interface PieceFindFilter {
  _id?: string;
  name?: string;
  description?: string;
}

export type PieceSimpleEditType = ReqType<ReqID.updateSimple, PieceSimpleEditQuery>;
export type PieceLinkEditType = ReqType<ReqID.updateLink, PieceLinkEditQuery>;
export type PieceDeleteType = ReqType<ReqID.deleteOne, string>; // string: piece ID
export type PieceFixType = ReqType<ReqID.fixLinks, string>; // string: piece ID
export type PieceFindType = ReqType<ReqID.getMany | ReqID.getOne, PieceFindFilter>;
export type PieceGetAllType = ReqType<ReqID.getAll, null>;
export type PieceCreateType = ReqType<ReqID.createOne, null>;

// FORMULA

export interface FormulaSimpleEditQuery {
  id: string;
  filter: FormulaSimpleEditFilter;
}

export interface FormulaSimpleEditFilter {
  name?: string;
  description?: string;
}

export interface FormulaLinkEditQuery {
  id: LinkEditID;
  filter: FormulaLinkEditFilter;
}

export interface FormulaLinkEditFilter {
  formulaID: string;
  formulaItem?: FormulaItem;
  chemicalID?: string;
}

export interface FormulaFindFilter {
  _id?: string;
  name?: string;
  description?: string;
}

export type FormulaSimpleEditType = ReqType<ReqID.updateSimple, FormulaSimpleEditQuery>;
export type FormulaLinkEditType = ReqType<ReqID.updateLink, FormulaLinkEditQuery>;
export type FormulaDeleteType = ReqType<ReqID.deleteOne, string>; // string: formula id
export type FormulaFixType = ReqType<ReqID.fixLinks, string>; // string: formula id
export type FormulaFindType = ReqType<ReqID.getMany | ReqID.getOne, FormulaFindFilter>;
export type FormulaGetAllType = ReqType<ReqID.getAll, null>;
export type FormulaCreateType = ReqType<ReqID.createOne, null>;

// CHEMICAL

export interface ChemicalSimpleEditQuery {
  id: string;
  filter: ChemicalSimpleEditFilter;
}

export interface ChemicalSimpleEditFilter {
  name?: string;
  chemicalName?: string;
  mass?: number;
}

export interface ChemicalFindFilter {
  _id?: string;
  chemicalName?: string;
  mass?: number;
}

export type ChemicalSimpleEditType = ReqType<ReqID.updateSimple, ChemicalSimpleEditQuery>;
export type ChemicalDeleteType = ReqType<ReqID.deleteOne, string>; // string: chemical ID
export type ChemicalFixType = ReqType<ReqID.fixLinks, string>; // string: chemical ID
export type ChemicalFindType = ReqType<ReqID.getMany | ReqID.getOne, ChemicalFindFilter>;
export type ChemicalGetAllType = ReqType<ReqID.getAll, null>;
export type ChemicalCreateType = ReqType<ReqID.createOne, null>;
