import { IGraph } from "../models/graph/types";
import { Color, Point } from "../models/graph/types";

export enum ReqId {
  postOne,
  postMany,
  getOne,
  getMany,
  getModels,
  getRecorded,
  createOne,
  update,
}

export interface NewGraphFilter {
  name: string;
  description?: string;
  graphType: string;
  color: Color;
  points: Point[];
  date?: Date;
}

export interface GraphEditFilter {
  name?: string;
  description?: string;
  graphType?: string;
  color?: Color;
  points?: Point[];
  date?: Date;
}

export interface GraphFindFilter {
  name?: string;
  graphType?: string;
}

export interface GetRequest {
  id: ReqId;
  filter?: GraphFindFilter | NewGraphFilter;
}

export interface PostRequest {
  id: ReqId;
  graph: IGraph;
  filter?: GraphEditFilter;
}
