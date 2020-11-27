import { Graph } from "../engine/types";

export enum GetID {
  ping,
  start,
  stop,
  pause,
  getSensorValues,
}

export interface GetParam {}

export interface GetRequest {
  id: GetID;
  param: GetParam;
}

export enum PostID {
  load,
}

export interface PostParam {
  graph: Graph;
}

export interface PostRequest {
  id: PostID;
  param: PostParam;
}
