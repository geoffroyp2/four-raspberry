import { get, post } from "./client";
import { GraphFindFilter, NewGraphFilter, GraphGetId, GraphPostId } from "./graphQueryFormat";
import { GraphEditFilter } from "../../../db/src/controllers/graphQueryFormat";
import { Graph } from "../interfaces/Igraph";

export default class db {
  static getOneGraph(filter: GraphFindFilter, callback: (res: Graph) => void) {
    get({ id: GraphGetId.getOne, filter: filter }, callback);
  }

  static getManyGraphs(filter: GraphFindFilter, callback: (res: Graph[]) => void) {
    get({ id: GraphGetId.getMany, filter: filter }, callback);
  }

  static getAllGraphs(callback: (res: Graph[]) => void) {
    get({ id: GraphGetId.getAll }, callback);
  }

  static deleteGraph(id: string, callback: () => void) {
    get({ id: GraphGetId.deleteOne, filter: { _id: id } }, (res) => callback());
  }

  static createNewGraph(filter: NewGraphFilter, callback: (res: Graph) => void) {
    get({ id: GraphGetId.createOne, filter: filter }, callback);
  }

  static updateGraph(graph: Graph, callback: (res: Graph) => void) {
    const filter: GraphEditFilter = {
      name: graph.name,
      description: graph.description,
      graphType: graph.graphType,
      graphRef: graph.graphRef,
      color: graph.color,
      pieces: graph.pieces,
      points: [...graph.points].sort((a, b) => a.x - b.x),
      date: graph.date,
    };

    post({ id: GraphPostId.updateOne, graphId: graph._id, filter: filter }, callback);
  }
}
