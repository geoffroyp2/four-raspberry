import { IResolvers } from "apollo-server-express";
import Attribute from "./attribute";
import Mutation from "./mutation";
import Query from "./query";

const RecordResolver: IResolvers = {
  Query: Query,
  Mutation: Mutation,
  Piece: Attribute,
};

export default RecordResolver;
