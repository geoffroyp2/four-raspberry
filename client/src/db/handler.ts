import { get, post } from "./client";
import { GraphFindFilter, NewGraphFilter, ReqId } from "./queryFormat";
import { GraphEditFilter } from "../../../db/src/controllers/queryFormat";
import { Graph } from "../interfaces/Igraph";

export default class dbHandler {
  static getModelGraphs(callback: (res: Graph[]) => void) {
    get({ id: ReqId.getModels }, callback);
  }

  static getRecordedGraphs(callback: (res: Graph[]) => void) {
    get({ id: ReqId.getRecorded }, callback);
  }

  static getOneGraph(filter: GraphFindFilter, callback: (res: Graph) => void) {
    get({ id: ReqId.getOne, filter: filter }, callback);
  }

  static getManyGraphs(
    filter: GraphFindFilter,
    callback: (res: Graph[]) => void
  ) {
    get({ id: ReqId.getOne, filter: filter }, callback);
  }

  static createNewGraph(
    filter: NewGraphFilter,
    callback: (res: Graph) => void
  ) {
    get({ id: ReqId.createOne, filter: filter }, callback);
  }

  static updateGraph(
    graph: Graph,
    filter: GraphEditFilter,
    callback: (res: Graph) => void
  ) {
    post({ id: ReqId.update, graph: graph, filter: filter }, callback);
  }
}
