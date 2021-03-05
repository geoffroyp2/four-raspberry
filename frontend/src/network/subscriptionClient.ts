import { SubscriptionClient } from "subscriptions-transport-ws";
import ApolloClient from "apollo-client";

const GRAPHQL_ENDPOINT = "ws://localhost:3001/graphql";

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});

// const apolloClient = new ApolloClient({
//   networkInterface: client,
// });
