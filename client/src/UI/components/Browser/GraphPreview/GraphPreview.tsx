import React from "react";
import { Container } from "react-bootstrap";

import SimpleGraph from "./SimpleGraph";

const GraphPreview = () => {
  return (
    <Container
      fluid
      className="w-100 m-0 p-1 rounded shadow"
      style={{ backgroundColor: "#232323", border: "solid 1px rgba(10,10,10,0.8)" }}
    >
      <SimpleGraph />
    </Container>
  );
};

export default GraphPreview;
