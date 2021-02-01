import { IResolvers } from "apollo-server-express";
import Attribute from "./attribute";
import Mutation from "./mutation";
import Query from "./query";

const ChemicalResolver: IResolvers = {
  Query: Query,
  Mutation: Mutation,
  Chemical: Attribute,
};

export default ChemicalResolver;
