import React from "react";
import "./App.scss";
import { useSelector } from "react-redux";

import RecordEditor from "./editor/record/RecordEditor";
import MainNavBar from "./navBar/MainNavBar";
import { selectCurrentScreen } from "@navBar/MainNavSlice";

const mainScreens = {
  live: <></>,
  target: <></>,
  record: <RecordEditor />,
  piece: <></>,
  formula: <></>,
};

function App() {
  const currentScreen = useSelector(selectCurrentScreen);

  return (
    <div className="App">
      <MainNavBar />
      {mainScreens[currentScreen]}
    </div>
  );
}

export default App;
