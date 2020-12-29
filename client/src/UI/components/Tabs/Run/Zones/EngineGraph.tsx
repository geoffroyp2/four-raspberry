import { engineReferenceColor, engineReferencePoints } from "@redux/dataReducers/engineDataSlice";
import SimpleGraph from "@UITabs/sharedComponents/SimpleGraph";
import React from "react";
import { Container } from "react-bootstrap";

const EngineGraph = () => {
  return (
    <Container
      fluid
      className="m-0 p-1 pt-2 rounded shadow"
      style={{ backgroundColor: "#232323", border: "solid 1px rgba(10,10,10,0.8)" }}
    >
      <SimpleGraph pointsSelector={engineReferencePoints} colorSelector={engineReferenceColor} refPoints={null} />
    </Container>
  );
};

export default EngineGraph;
