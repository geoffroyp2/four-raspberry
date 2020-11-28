import { Graph } from "@clientTypes/Graph";

export const EnginePostIdString = ["Post Graph"];
export enum EnginePostId {
  loadGraph,
}

export type EnginePostRequest = {
  id: EnginePostId.loadGraph;
  data: Graph;
};
