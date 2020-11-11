import { Request, Response } from "express";
import { BaseController } from "../controllers/baseController";

export class Routes {
  public nodesController: BaseController = new BaseController();

  public routes(app): void {
    app.route("/graph").post(this.nodesController.post);
  }
}
