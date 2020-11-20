import { get, post } from "./client";
import { GraphFindFilter, NewGraphFilter, ReqId } from "./queryFormat";
import { GraphEditFilter } from "../../../db/src/controllers/queryFormat";
import { Graph } from "../interfaces/Igraph";

const handleDate = (input: any): void => {
  input.date = new Date(input.date);
  input.lastUpdated = new Date(input.lastUpdated);
};

export default class dbHandler {
  static getAllGraphs(callback: (res: Graph[]) => void) {
    get({ id: ReqId.getAll }, (res: any[]) => {
      res.forEach((g) => handleDate(g));
      callback(res);
    });
  }

  static getModelGraphs(callback: (res: Graph[]) => void) {
    get({ id: ReqId.getModels }, (res: any[]) => {
      res.forEach((g) => handleDate(g));
      callback(res);
    });
  }

  static getRecordedGraphs(callback: (res: Graph[]) => void) {
    get({ id: ReqId.getRecorded }, (res: any[]) => {
      res.forEach((g) => handleDate(g));
      callback(res);
    });
  }

  static getOneGraph(filter: GraphFindFilter, callback: (res: Graph) => void) {
    get({ id: ReqId.getOne, filter: filter }, (res: any) => {
      handleDate(res);
      callback(res);
    });
  }

  static getManyGraphs(
    filter: GraphFindFilter,
    callback: (res: Graph[]) => void
  ) {
    get({ id: ReqId.getOne, filter: filter }, (res: any[]) => {
      res.forEach((g) => handleDate(g));
      callback(res);
    });
  }

  static deleteGraph(id: string, callback: () => void) {
    get({ id: ReqId.delete, filter: { _id: id } }, callback);
  }

  static createNewGraph(
    filter: NewGraphFilter,
    callback: (res: Graph) => void
  ) {
    get({ id: ReqId.createOne, filter: filter }, (res: any) => {
      handleDate(res);
      callback(res);
    });
  }

  static updateGraph(
    graph: Graph,
    filter: GraphEditFilter,
    callback: (res: Graph) => void
  ) {
    post({ id: ReqId.update, graph: graph, filter: filter }, (res: any) => {
      handleDate(res);
      callback(res);
    });
  }
}
