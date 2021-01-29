import * as express from "express";
import { ApolloServer, Config } from "apollo-server-express";

import { initializeSequelizeModels } from "./database/models/init";
import database from "./database";
import schema from "./schema";

const config: Config = {
  schema: schema,
  introspection: true, // GUI
  playground: true, // Playground
};

// Create express instance and plug Apollo in
const app = express();
const server = new ApolloServer(config);
server.applyMiddleware({
  app,
  path: "/graphql",
});

// initialize database models
initializeSequelizeModels(database);
console.log("Sequelize initialized");

export default app;