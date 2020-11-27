import React from "react";
import { Container } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";

import { useSelector } from "react-redux";
import { selectedGraph } from "@redux/graphSlice";

import ProgramName from "./components/ProgramName";
import ProgramType from "./components/ProgramType";
import ProgramGraphRef from "./components/ProgramGraphRef";
import ProgramColor from "./components/ProgramColor";
import ProgramDescription from "./components/ProgramDescription";
import ProgramPoints from "./components/ProgramPoints";
import ProgramDate from "./components/ProgramDate";
import ProgramLastUpdated from "./components/ProgramLastUpdated";

const InfoCard = () => {
  const currentGraph = useSelector(selectedGraph);

  return (
    <Scrollbars
      className="rounded"
      style={{ height: "100%", border: "solid 1px rgba(10,10,10,0.8)", backgroundColor: "#232323", overflow: "hidden" }}
    >
      <Container className="pt-1  flex-row justify-content-start rounded pr-4">
        <ProgramName />
        <ProgramType />
        {!currentGraph.graphType && <ProgramGraphRef />}
        <ProgramDate />
        <ProgramColor />
        <ProgramDescription />
        <ProgramPoints />
        <ProgramLastUpdated />
      </Container>
    </Scrollbars>
  );
};

export default InfoCard;
