import { IResolvers } from "apollo-server-express";
import { engineSubscription, engineMutation } from "./engineSubscription";

const resolvers: IResolvers = {
  Subscription: engineSubscription,
  Mutation: engineMutation,
};

export default resolvers;
