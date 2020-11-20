import { Graph } from "../interfaces/Igraph";
import { Color, Point } from "../interfaces/programInterfaces";

export enum ReqId {
  postOne,
  postMany,
  getOne,
  getMany,
  getModels,
  getRecorded,
  getAll,
  createOne,
  update,
  delete,
}

export interface NewGraphFilter {
  name?: string;
  description?: string;
  graphType: boolean;
  points?: Point[];
  color?: Color;
  date?: Date;
}

export interface GraphEditFilter {
  name?: string;
  description?: string;
  graphType?: boolean;
  color?: Color;
  points?: Point[];
  date?: Date;
}

export interface GraphFindFilter {
  name?: string;
  graphType?: boolean;
}

export interface deleteFilter {
  _id?: string;
}

export interface GetRequest {
  id: ReqId;
  filter?: GraphFindFilter | NewGraphFilter | deleteFilter;
}

export interface PostRequest {
  id: ReqId;
  graph: Graph;
  filter?: GraphEditFilter;
}
