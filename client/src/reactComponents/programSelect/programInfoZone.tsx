import React, { useCallback, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProgramInfos from "./programInfos";
import ProgramTable from "./programTable";

import program from "../../program-logic/program";

const ProgramInfoZone = () => {
  const [programId, setProgramId] = useState<string>(
    program.currentDisplayedGraphID
  );
  const [showTable, setShowTable] = useState<boolean>(false);
  // const [editMode, setEditMode] = useState<boolean>(false);

  const open = useCallback((id) => {
    setProgramId(id);
    program.currentDisplayedGraphID = id;
    setShowTable(false);
  }, []);

  return (
    <Container fluid className="p-1 w-100 h-100">
      {showTable ? (
        <ProgramTable
          id={programId}
          select={open}
          cancel={() => setShowTable(false)}
        />
      ) : (
        <Container fluid className="h-100 p-0 m-0">
          <Row className="h-100">
            <Col className="h-100">
              <ProgramInfos select={() => setShowTable(true)} id={programId} />
            </Col>
            <Col className="h-100">
              <Row>Preview</Row>
              <Row>Buttons</Row>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default ProgramInfoZone;
