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

export interface Formula {
  id?: number;
  name?: string;
  description?: string;
  pieces?: Piece[];
  ingredients?: Ingredient[];
  createdAt?: String;
  updatedAt?: String;
}

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
