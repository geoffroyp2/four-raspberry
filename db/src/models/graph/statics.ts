import { IGraphDocument, IGraphModel } from "./types";

export async function findModelGraphs(
  this: IGraphModel
): Promise<IGraphDocument[]> {
  return this.find({ graphType: "model" });
}

export async function findRecordedGraphs(
  this: IGraphModel
): Promise<IGraphDocument[]> {
  return this.find({ graphType: "recorded" });
}
