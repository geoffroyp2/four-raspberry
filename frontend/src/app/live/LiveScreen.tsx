import React, { FC, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectLiveSensorValues, selectLiveStatus, selectLiveTargetId } from "./liveScreenSlice";

import { subscribe } from "./utils/subscription";

const LiveScreen: FC = () => {
  const currentTargetId = useSelector(selectLiveTargetId);
  const sensorValues = useSelector(selectLiveSensorValues);
  const currentStatus = useSelector(selectLiveStatus);

  useEffect(() => {
    subscribe();
  }, []);

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
            <td>{sensorValues.oxygen}</td>
            <td>{sensorValues.temperature}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default LiveScreen;
