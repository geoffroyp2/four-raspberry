import React, { useState } from "react";

import ProgramButtons from "./programButtons";
// import ProgramDescription from "./programDescription";
import ProgramGraph from "./ProgramGraph";
import ProgramCurrentValues from "./programCurrentValues";
import { Graph } from "../../interfaces/Igraph";

interface Props {
  programSelected: Graph;
}

const ProgramZone = ({ programSelected }: Props) => {
  const [currentProgram, setCurrentProgram] = useState<Graph>(programSelected);

  // force update of currentProgram from id change
  if (programSelected.name !== currentProgram.name)
    setCurrentProgram(programSelected);

  return (
    <div>
      {/* <ProgramDescription description={currentProgram.description} /> */}
      <ProgramGraph
        name={programSelected.name}
        color={programSelected.color}
        points={programSelected.points}
      />
      <ProgramCurrentValues />
      <ProgramButtons />
    </div>
  );
};

export default ProgramZone;
