import React, { useCallback, useEffect, useState } from "react";

import { IGraph } from "../../../db/src/models/graph/types";

import program from "../program-logic/program";
import LoadingScreen from "./loadingScreen";
import ProgramSelect from "./programSelect";
import ProgramZone from "./programZone";

const DisplayFour = () => {
  const [programList, setProgramList] = useState<IGraph[]>([]);
  const [programSelected, setProgramSelected] = useState<IGraph | null>(null);

  useEffect(() => {
    program.getGraphs((graphs: IGraph[]) => {
      setProgramList(graphs);
      setProgramSelected(program.selectProgram(0));
    });
  }, []);

  const programSelectChange = useCallback((id: number) => {
    setProgramSelected(program.selectProgram(id));
  }, []);

  return (
    <div>
      {programList.length > 0 && programSelected ? (
        <div>
          <ProgramSelect
            programList={programList}
            programSelectChange={programSelectChange}
          />
          <ProgramZone programSelected={programSelected} />
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default DisplayFour;
