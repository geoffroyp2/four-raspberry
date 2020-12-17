import React, { useCallback, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

// import ProgramInfos from "./programInfosLeftCard/leftInfoCard";
// import ProgramTable from "./programTable";

import program from "../programLogic/program";
// import GraphPreview from "./graphPreview/graphPreview";
// import PointEdit from "./programInfosLeftCard/pointEdit";
// import graphEditor from "../programLogic/graphEdit";

const ProgramInfoZone = () => {
  const [programId, setProgramId] = useState<string>(Object.entries(program.graphs)[0][0]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [showPointEdit, setShowPointEdit] = useState<boolean>(false);

  const [deletePendingState, setDeletePendingState] = useState<boolean>(false);
  const [createPendingState, setCreatePendingState] = useState<boolean>(false);

  const open = useCallback((id) => {
    setProgramId(id);
    setShowTable(false);
  }, []);

  // const deleteGraph = useCallback(() => {
  //   setDeletePendingState(true);
  //   graphEditor.delete(programId, (id) => {
  //     setProgramId(id);
  //     setDeletePendingState(false);
  //   });
  // }, [programId]);

  // const createGraph = useCallback(() => {
  //   setCreatePendingState(true);
  //   graphEditor.create((id) => {
  //     setProgramId(id);
  //     setCreatePendingState(false);
  //   });
  // }, []);

  return (
    <Container fluid className="p-1 w-100 h-100">
      {/* {showTable ? (
        <ProgramTable
          id={programId}
          select={open}
          cancel={() => setShowTable(false)}
        />
      ) : (
        <Container fluid className="h-100 p-0 m-0">
          <Row className="h-100">
            <Col className="h-100 pr-1">
              <Card className="h-100 shadow p-2">
                {showPointEdit ? (
                  <PointEdit
                    id={programId}
                    onClose={() => setShowPointEdit(false)}
                  />
                ) : (
                  <ProgramInfos
                    select={() => setShowTable(true)}
                    id={programId}
                    controls={{
                      deleteGraph: deleteGraph,
                      createGraph: createGraph,
                      deletePending: deletePendingState,
                      createPending: createPendingState,
                    }}
                  />
                )}
              </Card>
            </Col>
            <Col className="w-100 pl-1">
              <Row className="w-100 m-0">
                <GraphPreview
                  id={programId}
                  pointEdit={() => setShowPointEdit(true)}
                />
              </Row>
              <Row className="w-100 m-0">Buttons</Row>
            </Col>
          </Row>
        </Container>
      )} */}
    </Container>
  );
};

export default ProgramInfoZone;
