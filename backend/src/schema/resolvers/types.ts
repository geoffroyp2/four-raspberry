/**
 * Types and interfaces used for resolvers' inputs and outputs
 */

import { FileUpload } from "graphql-upload";
import Chemical, { ChemicalAttributes } from "../../database/models/formula/chemical";
import Formula from "../../database/models/formula/formula";
import Piece from "../../database/models/piece/piece";
import Record from "../../database/models/record/record";
import Target from "../../database/models/target/target";
import { DataLoadersType } from "../dataLoaders";

export type ResolverObjectType = { [key: string]: (obj: any, params: any, ctx: DataLoadersType) => Promise<any> | any };

export type ColorType = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type GQLTargetPointType = {
  id: number;
  time: number;
  temperature: number;
  oxygen: number;
};

export type GQLRecordPointType = {
  id: number;
  time: number;
  temperature: number;
  oxygen: number;
};

export type GQLIngredientType = {
  amount: number;
  chemical: ChemicalAttributes;
};

export interface TimeRange {
  start?: number;
  end?: number;
  amount?: number;
}

export interface GQLGenericResearchFields {
  id?: number;
  name?: string;
}

export interface GQLPageOptions {
  page?: number;
  amount?: number;
}

export interface GQLTargetId {
  targetId: number;
}
export interface GQLTTargetPointId {
  pointId: number;
}
export interface GQLRecordId {
  recordId: number;
}
export interface GQLRecordPointId {
  pointId: number;
}
export interface GQLPieceId {
  pieceId: number;
}
export interface GQLFormulaId {
  formulaId: number;
}
export interface GQLChemicalId {
  chemicalId: number;
}

export interface GQLTarget {
  name: string;
  description: string;
  color: ColorType;
  oven: string;
}
export interface GQLTargetPoint {
  time: number;
  temperature: number;
  oxygen: number;
}
export interface GQLRecord {
  name: string;
  description: string;
  color: ColorType;
  finished: boolean;
}
export interface GQLRecordPoint {
  time: number;
  temperature: number;
  oxygen: number;
}
export interface GQLPiece {
  name: string;
  description: string;
}
export interface GQLFormula {
  name: string;
  description: string;
}
export interface GQLChemicalFind extends GQLGenericResearchFields {
  chemicalName?: string;
}
export interface GQLChemical {
  name: string;
  chemicalName: string;
  color: ColorType;
}
export type GQLSortDirection = "ASC" | "DESC";
export type GQLGenericSortOptions = "name" | "id" | "createdAt" | "updatedAt";
export type GQLSortType<T> = {
  sortBy: T;
  order: GQLSortDirection;
};

export type GQLTargetSortOptions = GQLGenericSortOptions | "oven";
export interface GQLTargetQuery extends GQLGenericResearchFields, GQLPageOptions {
  sort: GQLSortType<GQLTargetSortOptions>;
}
export interface GQLTargetUpdate extends GQLTargetId, Partial<GQLTarget> {}
export interface GQLTargetPointUpdate extends GQLTargetPoint, GQLTTargetPointId, GQLTargetId {}
export interface GQLTargetPointCreate extends GQLTargetPoint, GQLTargetId {}
export interface GQLTargetPointDelete extends GQLTTargetPointId, GQLTargetId {}
export interface GQLTargetPointSetAll extends GQLTargetId {
  points: GQLTargetPoint[];
}

export type GQLRecordSortOptions = GQLGenericSortOptions | "oven" | "target";
export interface GQLRecordFind extends GQLGenericResearchFields {
  finished?: boolean;
  oven?: string;
}
export interface GQLRecordQuery extends GQLRecordFind, GQLPageOptions {
  sort: GQLSortType<GQLRecordSortOptions>;
}
export interface GQLRecordUpdate extends GQLRecordId, Partial<GQLRecord> {}
export interface GQLRecordTarget extends GQLRecordId, GQLTargetId {}
export interface GQLRecordPiece extends GQLRecordId, GQLPieceId {}
export interface GQLRecordPointUpdate extends GQLRecordPoint, GQLRecordPointId, GQLRecordId {}
export interface GQLRecordPointCreate extends GQLRecordPoint, GQLRecordId {}
export interface GQLRecordPointDelete extends GQLRecordPointId, GQLRecordId {}

export type GQLPieceSortOptions = GQLGenericSortOptions | "formula";
export interface GQLPieceQuery extends GQLGenericResearchFields, GQLPageOptions {
  sort: GQLSortType<GQLPieceSortOptions>;
}
export interface GQLPieceUpdate extends GQLPieceId, Partial<GQLPiece> {}
export interface GQLPieceFormula extends GQLPieceId, GQLFormulaId {}

export type GQLFormulaSortOptions = GQLGenericSortOptions | "target";
export interface GQLFormulaQuery extends GQLGenericResearchFields, GQLPageOptions {
  sort: GQLSortType<GQLFormulaSortOptions>;
}
export interface GQLFormulaTarget extends GQLFormulaId, GQLTargetId {}
export interface GQLFormulaUpdate extends GQLFormulaId, Partial<GQLFormula> {}
export interface GQLIngredientSelect extends GQLFormulaId, GQLChemicalId {}
export interface GQLIngredientAdd extends GQLIngredientSelect {
  amount: number;
}
export interface GQLIngredientUpdate extends GQLIngredientAdd {
  newChemicalId: number;
}

export type GQLChemicalSortOptions = GQLGenericSortOptions | "chemicalName";
export interface GQLChemicalQuery extends GQLChemicalFind, GQLPageOptions {
  sort: GQLSortType<GQLChemicalSortOptions>;
}
export interface GQLChemicalUpdate extends GQLChemicalId, Partial<GQLChemical> {}
export interface GQLChemicalVersion extends GQLChemicalId {
  versionName: string;
}

type GQLQueryRes<T> = {
  count: number;
  rows: T[];
};

export type GQLTargetQueryRes = GQLQueryRes<Target>;
export type GQLRecordQueryRes = GQLQueryRes<Record>;
export type GQLPieceQueryRes = GQLQueryRes<Piece>;
export type GQLFormulaQueryRes = GQLQueryRes<Formula>;
export type GQLChemicalQueryRes = GQLQueryRes<Chemical>;

export interface GQLUploadImage extends GQLPieceId {
  file: Promise<FileUpload>;
}

export interface GQLDeleteImage extends GQLPieceId {
  url: string;
}
