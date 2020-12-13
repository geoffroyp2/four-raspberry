import React, { useCallback } from "react";
import { Button, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { setScreenSelect } from "@redux/UIControlsSlice";
import { runStatus, setStatus } from "@redux/+old/engineStatusSlice";
import engine from "@engine/handler";
import { EngineCommand } from "@engine/types/getTypes";

const RunButtons = () => {
  const dispatch = useDispatch();
  const status = useSelector(runStatus);

  const handleStart = useCallback(async () => {
    const command = status === "run" ? EngineCommand.pause : EngineCommand.start;

    await engine.sendCommand(command).then((res) => {
      dispatch(setStatus(res));
    });
  }, [dispatch, status]);

  const handleStop = useCallback(async () => {
    await engine.sendCommand(EngineCommand.stop).then((res) => {
      dispatch(setStatus(res));
    });
  }, [dispatch]);

  return (
    <Container fluid className="pr-0 pl-0">
      <Button className="float-left btn-primary" onClick={() => dispatch(setScreenSelect("browse"))}>
        Retour à l'éditeur
      </Button>
      <Button className={"float-right " + (status === "run" ? "btn-warning" : "btn-success")} onClick={handleStart}>
        {status === "run" ? "Pause" : "Start"}
      </Button>
      <Button className="float-right btn-danger" onClick={handleStop}>
        Stop
      </Button>
    </Container>
  );
};

export default RunButtons;
