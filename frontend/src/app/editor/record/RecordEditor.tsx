import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import RecordInfos from "./RecordInfos";
import RecordButtons from "./RecordButtons";
import RecordLoadTable from "./RecordLoadTable";
import RecordGraph from "./RecordGraph";

const RecordEditor = () => {
  return (
    <Container fluid className="mt-2 pl-0 pr-0 pl-sm-2 pr-sm-2 pl-md-3 pr-md-3">
      <RecordButtons />
      <Row>
        <Col xl={6} md={12}>
          <RecordInfos />
        </Col>
        <Col xl={6} md={12}>
          <RecordGraph />
        </Col>
      </Row>

      <RecordLoadTable />
    </Container>
  );
};

export default RecordEditor;
