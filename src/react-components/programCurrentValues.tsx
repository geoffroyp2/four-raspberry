import React, { useEffect, useState } from "react";
import { SensorValues } from "../interfaces/programInterfaces";
import program from "../program-logic/program";

const ProgramCurrentValues = () => {
  const [sensorValues, setSensorValues] = useState<SensorValues>(
    program.getSensorValues()
  );
  const [targetTemp, setTargetTemp] = useState<number>(program.getTargetTemp());

  useEffect(() => {
    const timer = setTimeout(() => {
      setSensorValues(program.getSensorValues());
      setTargetTemp(program.getTargetTemp());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <p>{`Température actuelle: ${sensorValues.temp.toFixed(1)}`}</p>
      <p>{`Température cible: ${targetTemp.toFixed(1)}`}</p>
      <p>{`Oxygène actuel: ${sensorValues.oxy.toFixed(1)}`}</p>
    </div>
  );
};

export default ProgramCurrentValues;
