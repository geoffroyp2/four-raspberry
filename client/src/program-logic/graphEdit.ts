import { IGraph } from "../../../db/src/models/graph/types";
import { Program } from "./program";
import db from "../db/handler";

export default class graphEditor {
  private program: Program;

  constructor(program: Program) {
    this.program = program;
  }

  editDescription(text: string, callback: (res: string) => void): void {
    db.updateGraph(
      this.program.currentProgram!,
      { description: text },
      (res: IGraph) => {
        this.program.currentProgram = res;
        callback(res.description);
      }
    );
  }
}
