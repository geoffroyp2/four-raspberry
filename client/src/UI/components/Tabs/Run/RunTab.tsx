import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { updateEngineReference, updateEngineState } from "@redux/dataReducers/engineDataSlice";
import { LoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";

import engine from "@engine/handler";

import EngineButtons from "./Zones/EngineButtons";
import RunLoadTable from "./RunLoadTable";
import EngineGraph from "./Zones/EngineGraph";
import EngineInfos from "./Zones/EngineInfos";

const RunTab = () => {
  const dispatch = useDispatch();

  const showLoadTable = useSelector(LoadTableShow);

  // refresh data when component is mounted
  useEffect(() => {
    const getState = async () => {
      const state = await engine.getState();
      if (state) {
        dispatch(updateEngineState(state));
      }
      const ref = await engine.getReference();
      if (ref) {
        dispatch(updateEngineReference(ref));
      }
    };
    getState();
  });

  return showLoadTable ? (
    <RunLoadTable />
  ) : (
    <>
      <EngineGraph />
      <Row>
        <Col className="col-9">
          <EngineInfos />
        </Col>
        <Col className="col-3">
          <EngineButtons />
        </Col>
      </Row>
    </>
  );
};

export default RunTab;
