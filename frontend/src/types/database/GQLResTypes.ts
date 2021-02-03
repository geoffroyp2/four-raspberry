interface GQLRootResType<T> {
  count: number;
  rows: T[];
}
export type GQLRootResTypes = TargetRootRes | RecordRootRes | PieceRootRes | FormulaRootRes | ChemicalRootRes;

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
  createdAt?: String;
  updatedAt?: String;
}
export type TargetRootRes = { targets: GQLRootResType<Target> };

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
  createdAt?: String;
  updatedAt?: String;
}
export type RecordRootRes = { records: GQLRootResType<Record> };

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
  createdAt?: String;
  updatedAt?: String;
}
export type PieceRootRes = { pieces: GQLRootResType<Piece> };

export interface Formula {
  id?: number;
  name?: string;
  description?: string;
  pieces?: Piece[];
  ingredients?: Ingredient[];
  createdAt?: String;
  updatedAt?: String;
}
export type FormulaRootRes = { formulas: GQLRootResType<Formula> };

export interface Ingredient {
  amount?: number;
  chemical?: Chemical;
}

export interface Chemical {
  id?: number;
  name?: string;
  chemicalName?: string;
  density?: number;
  formulas?: Formula[];
  createdAt?: String;
  updatedAt?: String;
}
export type ChemicalRootRes = { chemicals: GQLRootResType<Chemical> };
