// import { Graph } from "../interfaces/Igraph";
import { Color, Point } from "../interfaces/programInterfaces";

export enum GraphGetId {
  getOne,
  getMany,
  getAll,
  createOne,
  deleteOne,
}

export enum GraphPostId {
  updateOne,
}

export interface NewGraphFilter {
  name?: string;
  description?: string;
  graphType?: boolean;
  graphRef?: string;
  points?: Point[];
  color?: Color;
  date?: string;
}

export interface GraphEditFilter {
  name?: string;
  description?: string;
  graphType?: boolean;
  graphRef?: string;
  color?: Color;
  points?: Point[];
  pieces?: string[];
  date?: string;
}

export interface GraphFindFilter {
  _id?: string;
  name?: string;
  graphType?: boolean;
  graphRef?: string;
}

export interface deleteFilter {
  _id?: string;
}

export interface GetRequest {
  id: GraphGetId;
  filter?: GraphFindFilter | NewGraphFilter | deleteFilter;
}

export interface PostRequest {
  id: GraphPostId;
  graphId: string;
  filter?: GraphEditFilter;
}
