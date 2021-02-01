import React from "react";
import { Container } from "react-bootstrap";

import { useSelector } from "react-redux";
import { selectedGraph } from "@redux/+old/graphSlice";

import ProgramName from "./components/ProgramName";
import ProgramType from "./components/ProgramType";
import ProgramGraphRef from "./components/ProgramGraphRef";
import ProgramColor from "./components/ProgramColor";
import ProgramDescription from "./components/ProgramDescription";
import ProgramPoints from "./components/ProgramPoints";
import ProgramDate from "./components/ProgramDate";
import ProgramLastUpdated from "./components/ProgramLastUpdated";

import ScrollZone from "../../Generic/ScrollZone";

const InfoCard = () => {
  const currentGraph = useSelector(selectedGraph);

  return (
    <ScrollZone
      content={
        <Container className="pt-1 pr-3 flex-row justify-content-start rounded">
          <ProgramName />
          <ProgramType />
          {!currentGraph.graphType && <ProgramGraphRef />}
          <ProgramDate />
          <ProgramColor />
          <ProgramDescription />
          <ProgramPoints />
          <ProgramLastUpdated />
        </Container>
      }
    />
  );
};

export default InfoCard;
