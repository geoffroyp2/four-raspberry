import React, { useState } from "react";

import { IGraph } from "../../../db/src/models/graph/types";

import ProgramButtons from "./programButtons";
import ProgramDescription from "./programDescription";
import ProgramGraph from "./ProgramGraph";
import ProgramCurrentValues from "./programCurrentValues";

interface Props {
  programSelected: IGraph;
}

const ProgramZone = ({ programSelected }: Props) => {
  const [currentProgram, setCurrentProgram] = useState<IGraph>(programSelected);

  // force update of currentProgram from id change
  if (programSelected.name !== currentProgram.name)
    setCurrentProgram(programSelected);

  return (
    <div>
      <ProgramDescription description={currentProgram.description} />
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
