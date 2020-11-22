import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import GraphPreview from "./GraphPreview/GraphPreview";
import PointEdit from "./GraphPreview/PointEdit";
import InfoCard from "./InfoCard/InfoCard";
import ProgramTable from "./ProgramTable";

const ProgramInfo = () => {
  const [ShowTable, setShowTable] = useState<boolean>(false);
  const [ShowPointEdit, setShowPointEdit] = useState<boolean>(false);

  return (
    <Container fluid className="p-1 w-100 h-100">
      {ShowTable ? (
        <ProgramTable close={() => setShowTable(false)} />
      ) : (
        <Container fluid className="h-100 p-0 m-0">
          <Row className="h-100">
            <Col className="h-100 pr-1">
              <Card className="h-100 shadow p-2">
                {ShowPointEdit ? (
                  <PointEdit close={() => setShowPointEdit(false)} />
                ) : (
                  <InfoCard select={() => setShowTable(true)} />
                )}
              </Card>
            </Col>
            <Col className="w-100 pl-1">
              <Row className="w-100 m-0">
                <GraphPreview pointEdit={() => setShowPointEdit(true)} />
              </Row>
              <Row className="w-100 m-0">Buttons</Row>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default ProgramInfo;
