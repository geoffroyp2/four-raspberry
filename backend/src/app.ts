import express from "express";
import http from "http";
import { ApolloServer, Config } from "apollo-server-express";

import { initializeSequelizeModels } from "./database/models/init";
import database from "./database";
import schema from "./schema";
import DataLoaders from "./schema/dataLoaders";
import { graphqlUploadExpress } from "graphql-upload";

const APIConfig: Config = {
  schema,
  subscriptions: {
    path: "/graphql",
    onConnect: (connectionParams, webSocket, context) => {
      const Headers = (webSocket as any).upgradeReq.rawHeaders as string[];
      const HeaderObj: { [key: string]: string } = {};
      for (let i = 0; i < Headers.length; i += 2) {
        HeaderObj[Headers[i]] = Headers[i + 1];
      }
      console.log(`\nClient connected:`);
      console.log(HeaderObj);
      // console.log(`User-Agent: ${HeaderObj["User-Agent"]}`);
    },
    onDisconnect: (webSocket, context) => {
      console.log("Client disconnected");
    },
  },
  context: DataLoaders,
  introspection: true, // Verbose errors
  playground: true, // Playground
  uploads: false, // Overriden by graphql-upload lib
};

// Create express instance and plug Apollo in
const app = express();
app.use(
  graphqlUploadExpress({
    maxFileSize: 1000000000,
    maxFiles: 10,
  })
); // graphql-upload setup

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
