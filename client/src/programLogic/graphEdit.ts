// import { Program } from "./program";
import db from "../db/handler";
import { Graph } from "../interfaces/Igraph";
import { GraphEditFilter } from "../../../db/src/controllers/queryFormat";

import program from "./program";

export default class graphEditor {
  public static editGraph(
    id: string,
    filter: GraphEditFilter,
    callback: (res: Graph) => void
  ): void {
    db.updateGraph(program.graphs[id], filter, (res: Graph) => {
      program.graphs[id] = res;
      Object.entries(program.UIRefresh).forEach(([id, cb]) => cb());
      callback(res);
    });
  }
}
