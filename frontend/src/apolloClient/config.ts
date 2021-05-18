import { WebSocketLink } from "@apollo/client/link/ws";

export const HttpConfig = {
  uri: "http://localhost:3001/graphql",
};

export const WsConfig: WebSocketLink.Configuration = {
  uri: "ws://localhost:3001/graphql",
  options: {
    reconnect: true,
  },
};

export const uploadConfig = {
  uri: "http://localhost:3001/graphql",
};
