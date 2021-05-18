import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { store } from "@app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import client from "@network/apolloClient";

import "./index.scss";
import "./assets/bootstrap.min.css";
import { ApolloProvider } from "@apollo/client";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
