/**
 * Types and interfaces used for resolvers' inputs and outputs
 */

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
  density: number;
}

export interface GQLTargetQuery extends GQLGenericResearchFields, GQLPageOptions {}
export interface GQLTargetUpdate extends GQLTargetId, Partial<GQLTarget> {}
export interface GQLTargetPointUpdate extends GQLTargetPoint, GQLTTargetPointId, GQLTargetId {}
export interface GQLTargetPointCreate extends GQLTargetPoint, GQLTargetId {}
export interface GQLTargetPointDelete extends GQLTTargetPointId, GQLTargetId {}

export interface GQLRecordFind extends GQLGenericResearchFields {
  finished?: boolean;
  oven?: string;
}
export interface GQLRecordQuery extends GQLRecordFind, GQLPageOptions {}
export interface GQLRecordUpdate extends GQLRecordId, Partial<GQLRecord> {}
export interface GQLRecordTarget extends GQLRecordId, GQLTargetId {}
export interface GQLRecordPiece extends GQLRecordId, GQLPieceId {}
export interface GQLRecordPointUpdate extends GQLRecordPoint, GQLRecordPointId, GQLRecordId {}
export interface GQLRecordPointCreate extends GQLRecordPoint, GQLRecordId {}
export interface GQLRecordPointDelete extends GQLRecordPointId, GQLRecordId {}

export interface GQLPieceQuery extends GQLGenericResearchFields, GQLPageOptions {}
export interface GQLPieceUpdate extends GQLPieceId, Partial<GQLPiece> {}
export interface GQLPieceFormula extends GQLPieceId, GQLFormulaId {}

export interface GQLFormulaUpdate extends GQLFormulaId, Partial<GQLFormula> {}
export interface GQLFormulaQuery extends GQLGenericResearchFields, GQLPageOptions {}
export interface GQLIngredientSelect extends GQLFormulaId, GQLChemicalId {}
export interface GQLIngredientAdd extends GQLIngredientSelect {
  amount: number;
}
export interface GQLIngredientUpdate extends GQLIngredientAdd {
  newChemicalId: number;
}

export interface GQLChemicalQuery extends GQLChemicalFind, GQLPageOptions {}
export interface GQLChemicalUpdate extends GQLChemicalId, Partial<GQLChemical> {}

type GQLQueryRes<T> = {
  count: number;
  rows: T[];
};

export type GQLTargetQueryRes = GQLQueryRes<Target>;
export type GQLRecordQueryRes = GQLQueryRes<Record>;
export type GQLPieceQueryRes = GQLQueryRes<Piece>;
export type GQLFormulaQueryRes = GQLQueryRes<Formula>;
export type GQLChemicalQueryRes = GQLQueryRes<Chemical>;
