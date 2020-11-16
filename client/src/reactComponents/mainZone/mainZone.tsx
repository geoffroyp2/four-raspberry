import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";

import program from "../../program-logic/program";
import ProgramInfoZone from "../programSelect/programInfoZone";

import LoadingScreen from "./loadingScreen";

const MainZone = () => {
  const [finishedLoading, setFinishedLoading] = useState<boolean>(false);
  const [showLoadEditZone, setShowLoadEditZone] = useState<boolean>(true);

  useEffect(() => {
    program.loadModelGraphs(() => setFinishedLoading(true));
  }, []);

  return finishedLoading ? (
    <Container fluid className="p-1 w-100 h-100">
      {showLoadEditZone && <ProgramInfoZone />}
      {!showLoadEditZone && (
        <>
          <Row sm={1} className="sm-3 m-2 float-right">
            <Button onClick={() => setShowLoadEditZone(true)}>Load</Button>
          </Row>
          {/* <ProgramZone programSelected={programSelected} /> */}
        </>
      )}
    </Container>
  ) : (
    <LoadingScreen />
  );
};

export default MainZone;
