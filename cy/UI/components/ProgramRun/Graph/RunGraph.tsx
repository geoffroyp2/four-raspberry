import React from "react";
import { Container } from "react-bootstrap";
import CompleteGraph from "./CompleteGraph";

const RunGraph = () => {
  return (
    <Container className="m-0 p-1 rounded shadow" style={{ backgroundColor: "#232323", border: "solid 1px rgba(10,10,10,0.8)" }}>
      <CompleteGraph />
    </Container>
  );
};

export default RunGraph;
