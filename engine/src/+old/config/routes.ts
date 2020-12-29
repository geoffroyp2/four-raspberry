import { EngineController } from "../../controllers/controller";
export class Routes {
  public engineController: EngineController = new EngineController();

  public routes(app): void {
    app.route("/engine").get(this.engineController.get).post(this.engineController.post);
  }
}
