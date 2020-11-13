import { get, post } from "./client";
import { IGraph } from "../../../db/src/models/graph/types";
import { GetFilter, ReqId } from "./queryFormat";

class dbHandler {
  getModelGraphs(callback: (res: IGraph[]) => void) {
    get({ id: ReqId.getModels }, callback);
  }

  getRecordedGraphs(callback: (res: IGraph[]) => void) {
    get({ id: ReqId.getRecorded }, callback);
  }

  getOneGraph(filter: GetFilter, callback: (res: IGraph) => void) {
    get({ id: ReqId.getOne, filter: filter }, callback);
  }

  getManyGraphs(filter: GetFilter, callback: (res: IGraph[]) => void) {
    get({ id: ReqId.getOne, filter: filter }, callback);
  }

  createNewGraph(graph: IGraph, callback: (res: boolean) => void) {
    post({ id: ReqId.postOne, data: graph }, callback);
  }

  updateGraph(graph: IGraph, callback: (res: boolean) => void) {
    post({ id: ReqId.update, data: graph }, callback);
  }
}

const db = new dbHandler();
export default db;
