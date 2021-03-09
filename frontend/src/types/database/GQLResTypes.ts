import { LiveStatusType } from "./GQLMutationTypes";

interface GQLQueryResType<T> {
  count: number;
  rows: T[];
}

export type GQLQueryResTypes = TargetQueryRes | RecordQueryRes | PieceQueryRes | FormulaQueryRes | ChemicalQueryRes;

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type OvenType = "gaz" | "electrique";

export interface Target {
  id?: number;
  name?: string;
  description?: string;
  color?: Color;
  oven?: OvenType;
  points?: TargetPoint[];
  records?: Record[];
  pieces?: Piece[];
  createdAt?: string;
  updatedAt?: string;
}
export type TargetQueryRes = { targets: GQLQueryResType<Target> };

export interface TargetPoint {
  id?: number;
  time?: number;
  temperature?: number;
  oxygen?: number;
}

export interface Record {
  id?: number;
  name?: string;
  description?: string;
  color?: Color;
  oven?: OvenType;
  points?: RecordPoint[];
  target?: Target;
  pieces?: Piece[];
  createdAt?: string;
  updatedAt?: string;
}
export type RecordQueryRes = { records: GQLQueryResType<Record> };

export interface RecordPoint {
  id?: number;
  time?: number;
  temperature?: number;
  oxygen?: number;
}

export interface Piece {
  id?: number;
  name?: string;
  description?: string;
  photos?: string[];
  records?: Record[];
  formula?: Formula;
  createdAt?: string;
  updatedAt?: string;
}
export type PieceQueryRes = { pieces: GQLQueryResType<Piece> };

export interface Formula {
  id?: number;
  name?: string;
  description?: string;
  pieces?: Piece[];
  ingredients?: Ingredient[];
  createdAt?: string;
  updatedAt?: string;
}
export type FormulaQueryRes = { formulas: GQLQueryResType<Formula> };

export interface Ingredient {
  amount?: number;
  chemical?: Chemical;
}

export interface Chemical {
  id?: number;
  name?: string;
  chemicalName?: string;
  density?: number;
  color?: Color;
  formulas?: Formula[];
  createdAt?: string;
  updatedAt?: string;
}
export type ChemicalQueryRes = { chemicals: GQLQueryResType<Chemical> };

// Subscription

export type SensorValuesType = {
  oxygen: number;
  temperature: number;
};

export type LiveValuesType = {
  status: LiveStatusType;
  programTime: number;
  sensors: SensorValuesType;
  currentTargetId: number;
};
