import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DisplayFour from "./reactOld/displayFour";
import "bootswatch/dist/darkly/bootstrap.min.css";

// React.Fragment instead of React.StrictMode because of Bootstrap

ReactDOM.render(
  <React.Fragment>
    <div className="App noselect">
      <DisplayFour />
    </div>
  </React.Fragment>,
  document.getElementById("root")
);
