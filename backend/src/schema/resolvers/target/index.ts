import { IResolvers } from "apollo-server-express";
import Attribute from "./attribute";
import Mutation from "./mutation";
import Query from "./query";

const TargetResolver: IResolvers = {
  Query: Query,
  Mutation: Mutation,
  Target: Attribute,
};

export default TargetResolver;
