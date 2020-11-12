import { get, post } from "./client";
import { IGraph } from "../../../db/src/models/graph/types";

class dbHandler {
  getModelGraphs(callback: (res: IGraph[]) => void) {
    const onReceive = (res: any): void => {
      callback(res.data);
    };
    get({ id: "getAll", arg: "model" }, onReceive);
  }
}

const db = new dbHandler();
export default db;
