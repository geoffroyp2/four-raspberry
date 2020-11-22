import { IGraph } from "../models/graph/types";
import { Color, Point } from "../models/graph/types";

export const logString = [
  "postOne",
  "postMany",
  "getOne",
  "getMany",
  "getModels",
  "getRecorded",
  "getAll",
  "createOne",
  "update",
  "delete",
];

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
  date?: string;
}

export interface GraphEditFilter {
  name?: string;
  description?: string;
  graphType?: boolean;
  color?: Color;
  points?: Point[];
  date?: string;
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
  graphId: string;
  filter?: GraphEditFilter;
}
