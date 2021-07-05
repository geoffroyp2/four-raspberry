import { WebSocketLink } from "@apollo/client/link/ws";

export const HttpConfig = {
  // uri: "http://192.168.0.121:3001/graphql",
  uri: "http://192.168.0.10:3001/graphql",
};

export const WsConfig: WebSocketLink.Configuration = {
  // uri: "ws://192.168.0.121:3001/graphql",
  uri: "ws://192.168.0.10:3001/graphql",
  options: {
    reconnect: true,
  },
};

export const uploadConfig = {
  // uri: "http://192.168.0.121:3001/graphql",
  uri: "http://192.168.0.10:3001/graphql",
};
