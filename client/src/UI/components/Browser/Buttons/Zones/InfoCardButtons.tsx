import React from "react";
import { ButtonGroup, Container } from "react-bootstrap";
import GraphDeleteButton from "../Individual/GraphDeleteButton";
import InfosEditButton from "../Individual/InfosEditButton";
import GraphLoadButton from "../Individual/GraphLoadButton";
import NewGraphButton from "../Individual/NewGraphButton";

const InfoCardButtons = () => {
  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      <GraphDeleteButton />
      <ButtonGroup>
        <InfosEditButton />
        <GraphLoadButton />
        <NewGraphButton />
      </ButtonGroup>
    </Container>
  );
};

export default InfoCardButtons;
