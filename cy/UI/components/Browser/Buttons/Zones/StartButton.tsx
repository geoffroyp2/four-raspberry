import React, { useCallback, useState } from "react";
import { Button, Container, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraph, selectedGraphType } from "@redux/+old/graphSlice";
import { setScreenSelect } from "@redux/UIControlsSlice";
import { setStatus } from "@redux/+old/engineStatusSlice";

import engine from "@engine/handler";

const StartButton = () => {
  const dispatch = useDispatch();
  const graphType = useSelector(selectedGraphType);
  const graph = useSelector(selectedGraph);
  const [Pending, setPending] = useState<boolean>(false);
  const [ShowTooltip, setShowTooltip] = useState<boolean>(false);

  const handleRun = useCallback(async () => {
    setPending(true);
    await engine.loadGraph(graph).then((res) => {
      setPending(false);
      dispatch(setStatus(res));
      dispatch(setScreenSelect("run"));
    });
  }, [dispatch, graph]);

  const handleToggle = useCallback(() => {
    console.log("ici");
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  }, []);

  return (
    <Container className="pr-0 pl-0">
      {graphType ? (
        <Button className="btn-lg float-right btn-success" onClick={handleRun}>
          {Pending && <Spinner as="span" animation="border" size="sm" role="status" />}
          <span className="pl-1 pr-1">Utiliser la Courbe</span>
        </Button>
      ) : (
        <OverlayTrigger
          placement={"top"}
          trigger="click"
          onToggle={handleToggle}
          show={ShowTooltip}
          overlay={<Tooltip id="StartTooltip">Utiliser un graph de type "modèle"</Tooltip>}
        >
          <span className="d-inline-block float-right">
            <Button className="btn-lg  btn-secondary" style={{ pointerEvents: "none" }} disabled={true}>
              Utiliser la Courbe
            </Button>
          </span>
        </OverlayTrigger>
      )}
      <Button className={"btn-lg float-left btn-success"} onClick={() => dispatch(setScreenSelect("run"))}>
        Afficher la Cuisson
      </Button>
    </Container>
  );
};

export default StartButton;
