import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store } from "./UI/redux/store";

import Four from "./UI/components/Four";

import "./index.css";
import "bootswatch/dist/darkly/bootstrap.min.css";

// React.Fragment instead of React.StrictMode because of Bootstrap

ReactDOM.render(
  <Provider store={store}>
    <div className="App noselect">
      <Four />
    </div>
  </Provider>,
  document.getElementById("root")
);
