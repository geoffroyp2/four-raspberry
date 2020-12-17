import { Graph } from "@src/../../cy/types/Graph";

export const EnginePostIdString = ["Post Graph"];
export enum EnginePostId {
  loadGraph,
}

export type EnginePostRequest = {
  id: EnginePostId.loadGraph;
  data: Graph;
};
