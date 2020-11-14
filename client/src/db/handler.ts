import { get, post } from "./client";
import { IGraph } from "../../../db/src/models/graph/types";
import { GraphFindFilter, NewGraphFilter, ReqId } from "./queryFormat";
import { GraphEditFilter } from "../../../db/src/controllers/queryFormat";

export default class dbHandler {
  static getModelGraphs(callback: (res: IGraph[]) => void) {
    get({ id: ReqId.getModels }, callback);
  }

  static getRecordedGraphs(callback: (res: IGraph[]) => void) {
    get({ id: ReqId.getRecorded }, callback);
  }

  static getOneGraph(filter: GraphFindFilter, callback: (res: IGraph) => void) {
    get({ id: ReqId.getOne, filter: filter }, callback);
  }

  static getManyGraphs(
    filter: GraphFindFilter,
    callback: (res: IGraph[]) => void
  ) {
    get({ id: ReqId.getOne, filter: filter }, callback);
  }

  static createNewGraph(
    filter: NewGraphFilter,
    callback: (res: IGraph) => void
  ) {
    get({ id: ReqId.createOne, filter: filter }, callback);
  }

  static updateGraph(
    graph: IGraph,
    filter: GraphEditFilter,
    callback: (res: IGraph) => void
  ) {
    post({ id: ReqId.update, graph: graph, filter: filter }, callback);
  }
}
