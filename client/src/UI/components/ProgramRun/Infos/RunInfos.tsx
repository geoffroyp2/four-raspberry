import { driverMode, raspConnected, runStatus, sensorValues, targetValues, valveValues } from "@redux/+old/engineStatusSlice";
import React from "react";
import { useSelector } from "react-redux";

const RunInfos = () => {
  const status = useSelector(runStatus);
  const mode = useSelector(driverMode);
  const connected = useSelector(raspConnected);
  const sensors = useSelector(sensorValues);
  const target = useSelector(targetValues);
  const valve = useSelector(valveValues);

  return (
    <div>
      <p>{"Status: " + status}</p>
      <p>{"Mode: " + mode}</p>
      <p>{"Connection: " + (connected ? "Ok" : "Not connected")}</p>
      <div>
        Valeurs mesurées:
        <p>{"Température: " + sensors.temp}</p>
        <p>{"Oxygène: " + sensors.oxy}</p>
      </div>
      <div>
        Valeurs cibles:
        <p>{"Température: " + target.temp}</p>
        <p>{"Oxygène: " + target.oxy}</p>
      </div>
      <p>{"Angle de valve: " + valve.angle}</p>
    </div>
  );
};

export default RunInfos;
