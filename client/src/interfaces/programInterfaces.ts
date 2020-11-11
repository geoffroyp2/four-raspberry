export interface ProgramInfo {
  id: number;
  name: string;
  description?: string;
  graph: Graph;
}

export interface Graph {
  color: Color;
  points: Point[];
}

export enum GraphType {
  model,
  recorded,
}

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

export interface SensorValues {
  temp: number;
  oxy: number;
}
