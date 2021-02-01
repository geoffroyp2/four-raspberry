import React, { useEffect } from "react";
import { Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { engineState, updateEngineReference, updateEngineState } from "@redux/dataReducers/engineDataSlice";

import { dateToDisplayString } from "@UIutils/dateFormat";
import { graphFormatTime } from "@UIutils/timeFormat";
import engine from "@engine/handler";

const EngineInfos = () => {
  const dispatch = useDispatch();
  const state = useSelector(engineState);

  // refresh loop
  useEffect(() => {
    const timer = setTimeout(async () => {
      const state = await engine.getState();
      if (state) {
        dispatch(updateEngineState(state));
        if (state.refID === "default") dispatch(updateEngineReference("default"));
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Table size="sm" variant="dark" striped bordered hover className="mb-0 mr-0">
      <tbody>
        <tr>
          <td>State: {state.status}</td>
          <td>
            Start Time: {state.times.start > 0 ? dateToDisplayString(new Date(state.times.start).toISOString(), true) : "-"}
          </td>
          <td>Run Time: {graphFormatTime(state.times.totalRun, true)}</td>
          <td> Pause Time: {graphFormatTime(state.times.totalPause, true)}</td>
        </tr>
        <tr>
          <td>Sensor 1: {state.values.sensor.v1}</td>
          <td>Sensor 2: {state.values.sensor.v2}</td>
          <td>Sensor 3: {state.values.sensor.v3}</td>
          <td>Sensor 4: {state.values.sensor.v4}</td>
        </tr>
        <tr>
          <td>Sensor 5: {state.values.sensor.v5}</td>
          <td>Sensor 6: {state.values.sensor.v6}</td>
          <td>Sensor 7: {state.values.sensor.v7}</td>
          <td>Sensor 8: {state.values.sensor.v8}</td>
        </tr>
        <tr>
          <td>Target: {state.values.target.temperature.toFixed(2)}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default EngineInfos;
