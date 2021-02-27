import React from "react";
import "./App.scss";

import { useSelector } from "react-redux";
import { selectCurrentScreen } from "@navBar/MainNavSlice";

import MainNavBar from "./navBar/MainNavBar";
import LiveScreen from "./live/LiveScreen";
import RecordEditor from "./editor/record/RecordEditor";
import TargetEditor from "@editor/target/TargetEditor";
import PieceEditor from "@editor/piece/PieceEditor";
import FormulaEditor from "@editor/formula/FormulaEditor";

const mainScreens = {
  live: <LiveScreen />,
  target: <TargetEditor />,
  record: <RecordEditor />,
  piece: <PieceEditor />,
  formula: <FormulaEditor />,
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
