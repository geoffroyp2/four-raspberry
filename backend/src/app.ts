import express from "express";
import http from "http";
import { ApolloServer, Config } from "apollo-server-express";

import { initializeSequelizeModels } from "./database/models/init";
import database from "./database";
import schema from "./schema";
import DataLoaders from "./schema/dataLoaders";

const APIConfig: Config = {
  schema,
  subscriptions: {
    path: "/graphql",
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Client connected");
    },
    onDisconnect: (webSocket, context) => {
      console.log("Client disconnected");
    },
  },
  context: DataLoaders,
  introspection: true, // Verbose errors
  playground: true, // Playground
};

// Create express instance and plug Apollo in
const app = express();
const APIServer = new ApolloServer(APIConfig);
APIServer.applyMiddleware({
  app,
  path: "/graphql",
});

// Add subscription endpoint
const httpServer = http.createServer(app);
APIServer.installSubscriptionHandlers(httpServer);

// initialize database models
initializeSequelizeModels(database);
console.log("Sequelize initialized");

export default httpServer;
