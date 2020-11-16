import { GraphEditFilter, NewGraphFilter } from "../../controllers/queryFormat";
import { IGraph, IGraphDocument, IGraphModel } from "./types";

export async function findModelGraphs(
  this: IGraphModel
): Promise<IGraphDocument[]> {
  return this.find({ graphType: true });
}

export async function findRecordedGraphs(
  this: IGraphModel
): Promise<IGraphDocument[]> {
  return this.find({ graphType: false });
}

export async function createNewGraph(
  this: IGraphModel,
  filter: NewGraphFilter
): Promise<IGraphDocument> {
  return this.create({
    name: filter.name || "Graph Sans Nom",
    description: filter.description || "",
    graphType: filter.graphType || false,
    color: filter.color || { r: 230, g: 30, b: 30, a: 0.9 },
    points: filter.points || [],
    date: filter.date || new Date(),
  });
}

export async function updateGraph(
  this: IGraphModel,
  graph: IGraph,
  filter: GraphEditFilter
): Promise<IGraphDocument> {
  return await this.findOneAndUpdate(
    { name: graph.name },
    { ...filter, lastUpdated: new Date() },
    { new: true, useFindAndModify: false }
  ).exec();
}
