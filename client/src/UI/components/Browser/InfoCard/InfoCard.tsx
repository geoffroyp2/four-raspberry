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
import ProgramGraphRef from "./components/ProgramGraphRef";
import { useSelector } from "react-redux";
import { selectedGraph } from "../../../redux/reducers/graphSlice";

const InfoCard = () => {
  const currentGraph = useSelector(selectedGraph);

  return (
    <div className="d-flex flex-column h-100 justify-content-between">
      <Scrollbars
        className="rounded"
        style={{ height: "100%", border: "solid 1px rgba(10,10,10,0.8)", backgroundColor: "#232323", overflow: "hidden" }}
      >
        <Container className="pt-1 flex-row justify-content-start rounded pr-4">
          <ProgramName />
          {divider}
          <ProgramType />
          {divider}
          {!currentGraph.graphType && <ProgramGraphRef />}
          {!currentGraph.graphType && divider}
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
