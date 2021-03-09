import TargetLoadTable from "@editor/target/TargetLoadTable";
import { selectTargetLoadRowSelected } from "@editor/target/_state/targetDisplaySlice";
import { setLoadTable } from "@editor/_state/editorSlice";
import React, { FC, useCallback, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectLiveSensorValues, selectLiveStatus, selectLiveTargetId } from "./liveScreenSlice";
import { sendCommand, updateTargetId } from "./utils/commands";

import { subscribe } from "./utils/subscription";

const LiveScreen: FC = () => {
  const dispatch = useDispatch();
  const currentTargetId = useSelector(selectLiveTargetId);
  const sensorValues = useSelector(selectLiveSensorValues);
  const currentStatus = useSelector(selectLiveStatus);
  const rowSelected = useSelector(selectTargetLoadRowSelected);

  useEffect(() => {
    subscribe();
  }, []);

  const handleSelect = useCallback(async () => {
    await updateTargetId(rowSelected);
    dispatch(setLoadTable({ target: false }));
  }, [rowSelected, dispatch]);

  return (
    <Container fluid>
      <Table striped hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Target ID</th>
            <th>Status</th>
            <th>Oxygene</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{currentTargetId}</td>
            <td>{currentStatus}</td>
            <td>{sensorValues.oxygen.toFixed(2)}</td>
            <td>{sensorValues.temperature.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>

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

      <TargetLoadTable select={handleSelect} />
    </Container>
  );
};

export default LiveScreen;
