import * as express from "express";

import AllController from "../controllers/all/controller";
import ChemicalController from "../controllers/chemical/controller";
import FormulaController from "../controllers/formula/controller";
import PieceController from "../controllers/piece/controller";
import RecordController from "../controllers/record/controller";
import ReferenceController from "../controllers/reference/controller";

export class Routes {
  public referenceController = new ReferenceController();
  public recordController = new RecordController();
  public pieceController = new PieceController();
  public formulaController = new FormulaController();
  public chemicalController = new ChemicalController();
  public allController = new AllController();

  public routes(app: express.Application): void {
    app.route("/reference").get(this.referenceController.get).post(this.referenceController.post);
    app.route("/record").get(this.recordController.get).post(this.recordController.post);
    app.route("/piece").get(this.pieceController.get).post(this.pieceController.post);
    app.route("/formula").get(this.formulaController.get).post(this.formulaController.post);
    app.route("/chemical").get(this.chemicalController.get).post(this.chemicalController.post);
    app.route("/all").get(this.allController.get);
  }
}
