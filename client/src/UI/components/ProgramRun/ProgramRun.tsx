import React from "react";
import MainZoneLayout from "../Generic/MainZoneLayout";
import RunButtons from "./Buttons/RunButtons";
import RunArea from "./RunArea";

const ProgramRun = () => {
  return <MainZoneLayout col={1} content={{ left: [<RunArea />, <RunButtons />] }} />;
};

export default ProgramRun;
