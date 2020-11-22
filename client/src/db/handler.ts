import { get, post } from "./client";
import { GraphFindFilter, NewGraphFilter, ReqId } from "./queryFormat";
import { GraphEditFilter } from "../../../db/src/controllers/queryFormat";
import { Graph } from "../interfaces/Igraph";

export default class db {
  static getAllGraphs(callback: (res: Graph[]) => void) {
    get({ id: ReqId.getAll }, callback);
  }

  static getModelGraphs(callback: (res: Graph[]) => void) {
    get({ id: ReqId.getModels }, callback);
  }

  static getRecordedGraphs(callback: (res: Graph[]) => void) {
    get({ id: ReqId.getRecorded }, callback);
  }

  static getOneGraph(filter: GraphFindFilter, callback: (res: Graph) => void) {
    get({ id: ReqId.getOne, filter: filter }, callback);
  }

  static getManyGraphs(filter: GraphFindFilter, callback: (res: Graph[]) => void) {
    get({ id: ReqId.getOne, filter: filter }, callback);
  }

  static deleteGraph(id: string, callback: () => void) {
    get({ id: ReqId.delete, filter: { _id: id } }, (res) => callback());
  }

  static createNewGraph(filter: NewGraphFilter, callback: (res: Graph) => void) {
    get({ id: ReqId.createOne, filter: filter }, callback);
  }

  static updateGraph(id: string, filter: GraphEditFilter, callback: (res: Graph) => void) {
    post({ id: ReqId.update, graphId: id, filter: filter }, callback);
  }
}
