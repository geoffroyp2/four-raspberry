import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setTargetGraph } from "@redux/engineStatusSlice";

import LoadingScreen from "../utils/LoadingScreen";
import engine from "@engine/handler";
import RunGraph from "./Graph/RunGraph";
import { Col, Container } from "react-bootstrap";
import RunInfos from "./Infos/RunInfos";

const RunArea = () => {
  const dispatch = useDispatch();
  const [GraphLoaded, setGraphLoaded] = useState<boolean>(false);

  // TODO : don't reload every single time
  useEffect(() => {
    engine.getGraph().then((res) => {
      setGraphLoaded(true);
      dispatch(setTargetGraph(res));
    });
  });

  return GraphLoaded ? (
    <Container fluid className="m-0 p-0 d-flex flex-direction-row">
      <Col className="col-9 pr-1 pl-0">
        <RunGraph />
      </Col>
      <Col className="col-3 pl-1">
        <RunInfos />
      </Col>
    </Container>
  ) : (
    <LoadingScreen />
  );
};

export default RunArea;
