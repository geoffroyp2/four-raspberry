import { selectCurrentScreen } from "@navBar/MainNavSlice";
import React from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import RecordEditor from "./editor/record/RecordEditor";
import MainNavBar from "./navBar/MainNavBar";

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
