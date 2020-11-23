import React from "react";
import { ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { divider } from "./utils/styles";
import { Scrollbars } from "react-custom-scrollbars";

import ProgramName from "./components/ProgramName";
import ProgramDescription from "./components/ProgramDescription";
import ProgramType from "./components/ProgramType";
import ProgramColor from "./components/ProgramColor";
import ProgramDates from "./components/ProgramDates";

import GraphDeleteButton from "../Buttons/GraphDeleteButton";
import NewGraphButton from "../Buttons/NewGraphButton";
import InfosEditButton from "../Buttons/InfosEditButton";
import GraphLoadButton from "../Buttons/GraphLoadButton";
import ProgramPoints from "./components/ProgramPoints";

const InfoCard = () => {
  return (
    <div className="d-flex flex-column h-100 justify-content-between">
      <Scrollbars style={{ height: "100%", border: "solid 1px rgba(10,10,10,0.8)", overflow: "hidden" }}>
        <Container className="pt-1 flex-row justify-content-start rounded shadow pr-4" style={{ backgroundColor: "#232323" }}>
          <ProgramName />
          {divider}
          <ProgramType />
          {divider}
          <ProgramColor />
          {divider}
          <ProgramDescription />
          {divider}
          <ProgramPoints />
          {divider}
          <ProgramDates />
        </Container>
      </Scrollbars>
      <Container>
        <Row className="pt-2">
          <Col>
            <Row className="m-1 justify-content-between align-items-center">
              <GraphDeleteButton />
              <ButtonGroup>
                <InfosEditButton />
                <GraphLoadButton />
                <NewGraphButton />
              </ButtonGroup>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InfoCard;
