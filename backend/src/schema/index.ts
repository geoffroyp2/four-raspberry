import { makeExecutableSchema } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import dataLoaders from "./dataLoaders";

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
