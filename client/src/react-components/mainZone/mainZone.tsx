import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";

import { IGraph } from "../../../../db/src/models/graph/types";

import program from "../../program-logic/program";
import LoadingScreen from "./../loadingScreen";
// import ProgramSelect from "./../programSelect";
import ProgramZone from "./../programZone";
import ProgramSelectZone from "../programSelect/programSelectZone";

const MainZone = () => {
  const [programList, setProgramList] = useState<IGraph[]>([]);
  const [programSelected, setProgramSelected] = useState<IGraph | null>(null);
  const [showLoadEditZone, setShowLoadEditZone] = useState<boolean>(true);

  useEffect(() => {
    program.getGraphs((graphs: IGraph[]) => {
      setProgramList(graphs);
      setProgramSelected(program.selectProgram(0));
    });
  }, []);

  const programSelectChange = useCallback((id: number) => {
    setProgramSelected(program.selectProgram(id));
  }, []);

  const validate = useCallback((programSelected: IGraph) => {
    setShowLoadEditZone(false);
  }, []);

  return programList.length > 0 ? (
    <Container fluid className="p-1 w-100 h-100">
      <Row sm={1} className="sm-3 m-2 float-right">
        <Button onClick={() => setShowLoadEditZone(true)}>Load</Button>
      </Row>
      {showLoadEditZone && <ProgramSelectZone validate={validate} />}
      {!showLoadEditZone && programSelected && (
        <ProgramZone programSelected={programSelected} />
      )}
    </Container>
  ) : (
    <LoadingScreen />
  );
};

export default MainZone;
