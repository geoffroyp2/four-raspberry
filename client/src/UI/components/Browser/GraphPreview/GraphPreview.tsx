import React from "react";
import { Card, Container } from "react-bootstrap";

import SimpleGraph from "./SimpleGraph";

const GraphPreview = () => {
  return (
    <Card className="w-100 shadow p-2">
      <Container fluid className="w-100 m-0 p-1 rounded shadow" style={{ backgroundColor: "#232323" }}>
        <SimpleGraph />
      </Container>
    </Card>
  );
};

export default GraphPreview;
