import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import database from "./database";

import allController from "./controllers/all/controller";
import chemicalController from "./controllers/chemical/controller";
import formulaController from "./controllers/formula/controller";
import pieceController from "./controllers/piece/controller";
import recordController from "./controllers/record/controller";
import referenceController from "./controllers/reference/controller";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.createRoutes();
    database.connect();
  }

  private config() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private createRoutes() {
    this.app.route("/reference").get(referenceController.get).post(referenceController.post);
    this.app.route("/record").get(recordController.get).post(recordController.post);
    this.app.route("/piece").get(pieceController.get).post(pieceController.post);
    this.app.route("/formula").get(formulaController.get).post(formulaController.post);
    this.app.route("/chemical").get(chemicalController.get).post(chemicalController.post);
    this.app.route("/all").get(allController.get);
  }
}

export default new App().app;
