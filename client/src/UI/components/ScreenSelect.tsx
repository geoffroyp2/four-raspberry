import React, { useState } from "react";
import ProgramInfo from "./Browser/ProgramInfo";
import ProgramRun from "./ProgramRun/ProgramRun";

const ScreenSelect = () => {
  const [Mode] = useState<string>("browse");
  return Mode === "browse" ? <ProgramInfo /> : <ProgramRun />;
};

export default ScreenSelect;
