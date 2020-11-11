import React, { useCallback, useState } from "react";
// import GraphExample from "./graphExample";
import program from "../program-logic/program";
import { ProgramInfo } from "../interfaces/programInterfaces";
import ProgramSelect from "./programSelect";
import ProgramZone from "./programZone";

const DisplayFour = () => {
  const [programList] = useState<ProgramInfo[]>(program.getPrograms());

  const [programSelected, setProgramSelected] = useState<ProgramInfo>(
    program.selectProgram(0)
  );

  const programSelectChange = useCallback((id: number) => {
    setProgramSelected(program.selectProgram(id));
  }, []);

  return (
    <div>
      <ProgramSelect
        programList={programList}
        programSelectChange={programSelectChange}
      />
      <ProgramZone programSelected={programSelected} />
    </div>
  );
};

export default DisplayFour;
