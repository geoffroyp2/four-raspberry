import { Program } from "./program";
import db from "../db/handler";
import { Graph } from "../interfaces/Igraph";
import { GraphEditFilter } from "../../../db/src/controllers/queryFormat";

export default class graphEditor {
  private program: Program;

  constructor(program: Program) {
    this.program = program;
  }

  public editGraph(
    id: string,
    filter: GraphEditFilter,
    callback: (res: Graph) => void
  ): void {
    db.updateGraph(this.program.modelGraphs[id], filter, (res: Graph) => {
      this.program.modelGraphs[id] = res;
      this.program.updateReceived = true;
      callback(res);
    });
  }
}
