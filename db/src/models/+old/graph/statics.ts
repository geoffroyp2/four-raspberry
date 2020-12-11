import { GraphEditFilter } from "../../controllers/graph/types/postTypes";
import { IGraphDocument, IGraphModel } from "./types";

export async function createNewGraph(this: IGraphModel): Promise<IGraphDocument> {
  // TODO: generate new unique name
  return this.create({
    name: "Courbe Sans Nom",
    description: "",
    graphType: false,
    graphRef: "",
    color: { r: 230, g: 30, b: 30, a: 0.9 },
    points: [],
    pieces: [],
    date: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  });
}

export async function updateGraph(this: IGraphModel, data: GraphEditFilter): Promise<IGraphDocument> {
  return await this.findOneAndUpdate(
    { _id: data.graphId },
    { ...data.filter, lastUpdated: new Date().toISOString() },
    { new: true, useFindAndModify: false }
  ).exec();
}
