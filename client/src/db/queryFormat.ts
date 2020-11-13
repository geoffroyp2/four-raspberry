import { IGraph } from "../../../db/src/models/graph/types";

export enum ReqId {
  postOne,
  postMany,
  getOne,
  getMany,
  getModels,
  getRecorded,
  update,
}

export interface GetFilter {
  name?: string;
  graphType?: string;
}

export interface GetRequest {
  id: ReqId;
  filter?: GetFilter;
}

export interface PostRequest {
  id: ReqId;
  data: IGraph;
}
