import { ApolloClient, ApolloLink, InMemoryCache, Operation, split } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { uploadConfig, WsConfig } from "./config";

// Both routes are terminating links (they send the request)
const wsLink = new WebSocketLink(WsConfig); // Ws route for subscription
const uploadLink = createUploadLink(uploadConfig); // Http route with file upload functionalities

// The fork in the route that sends either to Ws or to Upload
// 1st param is the evaluation of the condition
const splitLink = split(
  ({ query }: Operation) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  uploadLink
);

// Client creation
// TODO: explore cache options
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([splitLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export default client;
