import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Operation, split, gql, DocumentNode } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import ws from "ws";
import fetch from "cross-fetch";

const httpLink = new HttpLink({ uri: "http://localhost:3001/graphql", fetch });
const wsLink = new WebSocketLink({
  uri: "ws://localhost:3001/graphql",
  webSocketImpl: ws,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }: Operation) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([splitLink]),
});

export const GQLSubscribe = (query: DocumentNode, callback: (res: any) => void) => {
  const observable = client.subscribe({ query });
  observable.subscribe({
    next: callback,
    error: console.error,
  });
};
