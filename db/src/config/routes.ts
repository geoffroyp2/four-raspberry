import GraphController from "../controllers/graph/controller";

export class Routes {
  public graphController: GraphController = new GraphController();

  public routes(app): void {
    app.route("/graph").get(this.graphController.get).post(this.graphController.post);
  }
}
