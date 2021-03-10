import { SensorValuesType } from "../types/APITypes";

export const targetValues: SensorValuesType = {
  oxygen: 0,
  temperature: 0,
};

export const sensorValues: SensorValuesType = {
  oxygen: 0,
  temperature: 0,
};

export const updateTargetValues = (newVal: SensorValuesType) => {
  targetValues.oxygen = newVal.oxygen;
  targetValues.temperature = newVal.temperature;
};

export const updateSensorValues = (newVal: SensorValuesType) => {
  sensorValues.oxygen = newVal.oxygen;
  sensorValues.temperature = newVal.temperature;
};
