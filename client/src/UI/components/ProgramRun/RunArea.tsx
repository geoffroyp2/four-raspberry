import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { targetGraphID, setTargetGraph, targetGraph } from "@redux/engineStatusSlice";

import LoadingScreen from "../Generic/LoadingScreen";
import engine from "@engine/handler";
import RunGraph from "./Graph/RunGraph";
import { Col, Container } from "react-bootstrap";
import RunInfos from "./Infos/RunInfos";

const RunArea = () => {
  const dispatch = useDispatch();
  const ID1 = useSelector(targetGraph)._id;
  const ID2 = useSelector(targetGraphID);
  const [GraphLoaded, setGraphLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Refresh the graph to display if the target graph has changed
    if (ID1 !== ID2) {
      engine.getGraph().then((res) => {
        dispatch(setTargetGraph(res));
        setGraphLoaded(true);
      });
    } else {
      setGraphLoaded(true);
    }
  }, [ID1, ID2, dispatch]);

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
