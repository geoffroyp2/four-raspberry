import * as express from "express";
import * as bodyParser from "body-parser";
import { ApolloServer, Config } from "apollo-server-express";

import database from "./database";
import { Sequelize } from "sequelize/types";
import schema from "./schema";

const config: Config = {
  schema: schema,
  introspection: true, // GUI
  playground: true, // Playground
};
class App {
  public app: express.Application;
  public server: ApolloServer;
  private db: Sequelize;

  constructor() {
    this.app = express();
    this.server = new ApolloServer(config);
    this.server.applyMiddleware({
      app: this.app,
      path: "/graphql",
    });
    this.db = database; // To force Sequelize initialization at app start
  }
}

export default new App().app;
