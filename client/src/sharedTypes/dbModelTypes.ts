export interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Reference {
  _id: string;
  name: string;
  description: string;
  color: Color;
  points: Point[];
  records: string[];
  lastUpdated: string;
}

export interface Record {
  _id: string;
  name: string;
  description: string;
  reference: string;
  color: Color;
  points: Point[];
  pieces: string[];
  date: string;
  lastUpdated: string;
}

export interface Piece {
  _id: string;
  name: string;
  description: string;
  records: string[];
  images: string[];
  formula: string;
  date: string;
  lastUpdated: string;
}

export type CompositionElement = {
  id: string;
  amount: number;
};

export interface Formula {
  _id: string;
  name: string;
  description: string;
  composition: CompositionElement[];
  lastUpdated: string;
}

export interface Chemical {
  _id: string;
  name: string;
  chemicalName: string;
  mass: number;
  lastUpdated: string;
}
