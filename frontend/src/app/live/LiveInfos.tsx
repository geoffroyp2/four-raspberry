import React, { FC } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  selectLiveProgramTime,
  selectLiveSensorValues,
  selectLiveStatus,
  selectLiveTargetId,
} from "./_state/liveScreenSlice";

import { formatTime } from "@utils/timeFormat";

import EditorCard from "@components/EditorCard";

const LiveInfos: FC = () => {
  const currentTargetId = useSelector(selectLiveTargetId);
  const sensorValues = useSelector(selectLiveSensorValues);
  const currentStatus = useSelector(selectLiveStatus);
  const programTime = useSelector(selectLiveProgramTime);

  return (
    <EditorCard>
      <Table striped hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Target ID</th>
            <th>Status</th>
            <th>Oxygene</th>
            <th>Temperature</th>
            <th>Program Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{currentTargetId}</td>
            <td>{currentStatus}</td>
            <td>{sensorValues.oxygen.toFixed(2)}</td>
            <td>{sensorValues.temperature.toFixed(2)}</td>
            <td>{formatTime(programTime)}</td>
          </tr>
        </tbody>
      </Table>
    </EditorCard>
  );
};

export default LiveInfos;
