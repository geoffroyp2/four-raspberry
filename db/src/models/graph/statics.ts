import { GraphEditFilter } from "../../controllers/graphQueryFormat";
import { IGraphDocument, IGraphModel } from "./types";

export async function findModelGraphs(this: IGraphModel): Promise<IGraphDocument[]> {
  return this.find({ graphType: true });
}

export async function findRecordedGraphs(this: IGraphModel): Promise<IGraphDocument[]> {
  return this.find({ graphType: false });
}

export async function createNewGraph(this: IGraphModel, filter: GraphEditFilter): Promise<IGraphDocument> {
  return this.create({
    name: filter.name || "Courbe Sans Nom",
    description: filter.description || "",
    graphType: filter.graphType || false,
    graphRef: filter.graphRef || "",
    color: filter.color || { r: 230, g: 30, b: 30, a: 0.9 },
    points: filter.points || [],
    date: filter.date || new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  });
}

export async function updateGraph(this: IGraphModel, graphId: string, filter: GraphEditFilter): Promise<IGraphDocument> {
  return await this.findOneAndUpdate(
    { _id: graphId },
    { ...filter, lastUpdated: new Date().toISOString() },
    { new: true, useFindAndModify: false }
  ).exec();
}
