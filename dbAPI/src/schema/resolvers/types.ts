/**
 * Types and interfaces used for resolvers' inputs and outputs
 */

import { ChemicalAttributes } from "../../database/models/formula/chemical";

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

export interface GQLRecordId {
  recordId: number;
}
export interface GQLPieceId {
  pieceId: number;
}
export interface GQLTargetId {
  targetId: number;
}
export interface GQLTTargetPointId {
  pointId: number;
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
}
export interface GQLPiece {
  name: string;
  description: string;
}
export interface GQLFormula {
  name: string;
  description: string;
}
export interface GQLChemical {
  name: string;
  chemicalName: string;
  density: number;
}

export interface GQLTargetUpdate extends GQLTarget, GQLTargetId {}
export interface GQLTargetPointUpdate extends GQLTargetPoint, GQLTTargetPointId, GQLTargetId {}
export interface GQLTargetPointCreate extends GQLTargetPoint, GQLTargetId {}
export interface GQLTargetPointDelete extends GQLTTargetPointId, GQLTargetId {}

export interface GQLRecordFind extends GQLGenericResearchFields {
  oven?: string;
}
export interface GQLRecordUpdate extends GQLRecordId, GQLRecord {}
export interface GQLRecordTarget extends GQLRecordId, GQLTargetId {}
export interface GQLRecordPiece extends GQLRecordId, GQLPieceId {}

export interface GQLPieceUpdate extends GQLPieceId, GQLPiece {}
export interface GQLPieceFormula extends GQLPieceId, GQLFormulaId {}

export interface GQLFormulaUpdate extends GQLFormulaId, GQLFormula {}
export interface GQLIngredientSelect extends GQLFormulaId, GQLChemicalId {}
export interface GQLIngredientAdd extends GQLIngredientSelect {
  amount: number;
}
export interface GQLIngredientUpdate extends GQLIngredientAdd {
  newChemicalId: number;
}

export interface GQLChemicalUpdate extends GQLChemical, GQLChemicalId {}
