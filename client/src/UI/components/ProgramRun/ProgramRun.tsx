import React from "react";
import MainZone from "../utils/MainZone";
import RunButtons from "./Buttons/RunButtons";
import RunArea from "./RunArea";

const ProgramRun = () => {
  return <MainZone col={1} content={{ left: [<RunArea />, <RunButtons />] }} />;
};

export default ProgramRun;
