import { get, post } from "./client";
import { GraphFindFilter, GraphGetId } from "./types/getTypes";
import { GraphPostId, GraphEditFilter } from "./types/postTypes";

import { Graph } from "@clientTypes/Graph";

export default class db {
  public static async getOneGraph(filter: GraphFindFilter): Promise<Graph> {
    return get({ id: GraphGetId.getOne, data: filter }).then((data) => data[0]);
  }
  public static async getManyGraphs(filter: GraphFindFilter): Promise<Graph[]> {
    return get({ id: GraphGetId.getMany, data: filter }).then((data) => data);
  }
  public static async getAllGraphs(): Promise<Graph[]> {
    return get({ id: GraphGetId.getAll }).then((data) => data);
  }
  public static async deleteGraph(graph: Graph): Promise<void> {
    return get({ id: GraphGetId.deleteOne, data: { _id: graph._id } }).then();
  }
  public static async createNewGraph(): Promise<Graph> {
    return get({ id: GraphGetId.createOne }).then((data) => data[0]);
  }
  public static async updateGraph(graph: Graph): Promise<Graph> {
    return post({ id: GraphPostId.updateOne, data: this.filterFromGraph(graph) }).then((data) => data[0]);
  }
  // Private methods
  private static filterFromGraph(graph: Graph): GraphEditFilter {
    return {
      graphId: graph._id,
      filter: {
        name: graph.name,
        description: graph.description,
        graphType: graph.graphType,
        graphRef: graph.graphRef,
        color: graph.color,
        pieces: graph.pieces,
        points: [...graph.points].sort((a, b) => a.x - b.x),
        date: graph.date,
      },
    };
  }
}
