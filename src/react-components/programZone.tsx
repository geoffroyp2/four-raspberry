import React, { useState } from "react";
import { ProgramInfo } from "../interfaces/programInterfaces";
import ProgramButtons from "./programButtons";
import ProgramDescription from "./programDescription";
import ProgramGraph from "./ProgramGraph";
import ProgramCurrentValues from "./programCurrentValues";

interface Props {
  programSelected: ProgramInfo;
}

const ProgramZone = ({ programSelected }: Props) => {
  const [currentProgram, setCurrentProgram] = useState<ProgramInfo>(
    programSelected
  );

  // force update of currentProgram from id change
  if (programSelected.id !== currentProgram.id)
    setCurrentProgram(programSelected);

  return (
    <div>
      <ProgramDescription description={currentProgram.description} />
      <ProgramGraph name={programSelected.name} graph={programSelected.graph} />
      <ProgramCurrentValues />
      <ProgramButtons />
    </div>
  );
};

export default ProgramZone;
