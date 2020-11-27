import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";

import program from "../programLogic/program";
import ProgramInfoZone from "./programInfoZone";

// import LoadingScreen from "./loadingScreen";

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
    <div></div> // <LoadingScreen />
  );
};

export default MainZone;