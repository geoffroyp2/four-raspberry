import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { Routes } from "./config/routes";
import database from "./database";

class App {
  public app: express.Application;
  public routes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);
    database.connect();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
