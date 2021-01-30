import { IResolvers } from "apollo-server-express";
import Attribute from "./attribute";
import Mutation from "./mutation";
import Query from "./query";

const FormulaResolver: IResolvers = {
  Query: Query,
  Mutation: Mutation,
  Formula: Attribute,
};

export default FormulaResolver;
