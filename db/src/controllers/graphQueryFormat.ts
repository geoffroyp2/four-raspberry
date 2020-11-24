import { Point } from "../models/graph/types";
import { Color } from "../models/shared/types";

export const logStringGet = ["getOne", "getMany", "getAll", "createOne", "updateOne", "deleteOne"];
export const logStringPost = ["updateOne"];

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

export interface GraphEditFilter {
  name?: string;
  description?: string;
  graphType?: boolean;
  graphRef?: string;
  color?: Color;
  points?: Point[];
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

export interface GraphGetRequest {
  id: GraphGetId;
  filter?: GraphFindFilter | GraphEditFilter | deleteFilter;
}

export interface GraphPostRequest {
  id: GraphPostId;
  graphId: string;
  filter?: GraphEditFilter;
}
