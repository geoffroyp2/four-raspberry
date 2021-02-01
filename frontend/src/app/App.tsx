import { selectCurrentScreen } from "@navBar/MainNavSlice";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./App.scss";
import RecordEditor from "./editor/record/RecordEditor";
import MainNavBar from "./navBar/MainNavBar";

function App() {
  const currentScreen = useSelector(selectCurrentScreen);

  const getCurrentComponent = () => {
    switch (currentScreen) {
      case "live":
        return <></>;
      case "target":
        return <></>;
      case "record":
        return <RecordEditor />;
      case "piece":
        return <></>;
      case "formula":
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <div className="App">
      <MainNavBar />
      {getCurrentComponent()}
    </div>
  );
}

export default App;
