import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Operation, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { HttpConfig, WsConfig } from "./config";

const httpLink = new HttpLink(HttpConfig);
const wsLink = new WebSocketLink(WsConfig);

const splitLink = split(
  ({ query }: Operation) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([splitLink]),
});

export default client;
