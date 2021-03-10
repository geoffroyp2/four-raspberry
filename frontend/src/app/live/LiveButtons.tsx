import React, { FC } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { setLoadTable } from "@editor/_state/editorSlice";

import { sendCommand } from "./utils/mutations";

const LiveButtons: FC = () => {
  const dispatch = useDispatch();

  return (
    <ButtonGroup>
      <Button onClick={() => sendCommand("start")} className="btn-success">
        start
      </Button>
      <Button onClick={() => sendCommand("stop")} className="btn-danger">
        stop
      </Button>
      <Button onClick={() => sendCommand("pause")} className="btn-warning">
        pause
      </Button>
      <Button className="" onClick={() => dispatch(setLoadTable({ target: true }))}>
        Selectionner une Courbe
      </Button>
    </ButtonGroup>
  );
};

export default LiveButtons;
