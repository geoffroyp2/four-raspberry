import { Chemical, Formula, Piece, Record, Reference, Color, Point } from "./dbModelTypes";

// COMMON

export enum ReqID {
  getAll,
  getMany,
  getOne,
  deleteOne,
  createOne,
  updateOne,
}

export enum ResID {
  error,
  success,
}

interface ReqType<T, U> {
  id: T;
  data: U;
}

interface ResType<T> {
  id: ResID;
  data: T[];
}

// REFERENCE

export interface ReferenceEditFilter {
  id: string;
  filter: {
    name: string;
    description: string;
    color: Color;
    points: Point[];
    records: string[];
  };
}

export interface ReferenceDeleteFilter {
  _id: string;
}

export interface ReferenceFindFilter {
  _id?: string;
}

export type ReferenceEditType = ReqType<ReqID.updateOne, ReferenceEditFilter>;
export type ReferenceDeleteType = ReqType<ReqID.deleteOne, ReferenceDeleteFilter>;
export type ReferenceFindType = ReqType<ReqID.getMany | ReqID.getOne, ReferenceFindFilter>;
export type ReferenceGetAllType = ReqType<ReqID.getAll, null>;
export type ReferenceCreateType = ReqType<ReqID.createOne, null>;
export type ReferenceResType = ResType<Reference>;

// RECORD

export interface RecordEditFilter {
  id: string;
  filter: {
    name: string;
    description: string;
    reference: string;
    color: Color;
    points: Point[];
    pieces: string[];
    date: string;
  };
}

export interface RecordDeleteFilter {
  _id: string;
}

export interface RecordFindFilter {
  _id?: string;
  reference?: string;
}

export type RecordEditType = ReqType<ReqID.updateOne, RecordEditFilter>;
export type RecordDeleteType = ReqType<ReqID.deleteOne, RecordDeleteFilter>;
export type RecordFindType = ReqType<ReqID.getMany | ReqID.getOne, RecordFindFilter>;
export type RecordGetAllType = ReqType<ReqID.getAll, null>;
export type RecordCreateType = ReqType<ReqID.createOne, null>;
export type RecordResType = ResType<Record>;

// PIECE

export interface PieceEditFilter {
  id: string;
  filter: {
    name?: string;
    description?: string;
    records?: string[];
    images?: string[];
    formula?: string;
    date?: string;
  };
}

export interface PieceDeleteFilter {
  _id: string;
}

export interface PieceFindFilter {
  _id?: string;
}

export type PieceEditType = ReqType<ReqID.updateOne, PieceEditFilter>;
export type PieceDeleteType = ReqType<ReqID.deleteOne, PieceDeleteFilter>;
export type PieceFindType = ReqType<ReqID.getMany | ReqID.getOne, PieceFindFilter>;
export type PieceGetAllType = ReqType<ReqID.getAll, null>;
export type PieceCreateType = ReqType<ReqID.createOne, null>;
export type PieceResType = ResType<Piece>;

// FORMULA

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

// CHEMICAL

export interface ChemicalEditFilter {
  id: string;
  filter: {
    name?: string;
    chemicalName?: string;
    mass?: number;
  };
}

export interface ChemicalDeleteFilter {
  _id: string;
}

export interface ChemicalFindFilter {
  _id?: string;
}

export type ChemicalEditType = ReqType<ReqID.updateOne, ChemicalEditFilter>;
export type ChemicalDeleteType = ReqType<ReqID.deleteOne, ChemicalDeleteFilter>;
export type ChemicalFindType = ReqType<ReqID.getMany | ReqID.getOne, ChemicalFindFilter>;
export type ChemicalGetAllType = ReqType<ReqID.getAll, null>;
export type ChemicalCreateType = ReqType<ReqID.createOne, null>;
export type ChemicalResType = ResType<Chemical>;
