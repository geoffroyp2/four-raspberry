import { IResolvers } from "apollo-server-express";
import { GraphQLUpload } from "graphql-upload";
import Attribute from "./attribute";
import Mutation from "./mutation";
import Query from "./query";

const RecordResolver: IResolvers = {
  Upload: GraphQLUpload, // default Upload scalar
  Query: Query,
  Mutation: Mutation,
  Piece: Attribute,
};

export default RecordResolver;
