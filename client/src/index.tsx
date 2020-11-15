import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DisplayFour from "./react-components/displayFour";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/darkly/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="App noselect">
      <DisplayFour />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
