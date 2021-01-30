import { OvenType } from "../../database/models/target/target";
import TargetPoint from "../../database/models/target/targetPoints";

export const getColor = () => {
  return getNum255() + "-" + getNum255() + "-" + getNum255() + "-" + getNumFloat();
};

export const getNum255 = () => {
  return ("" + Math.floor(Math.random() * 256)).padStart(3, "0");
};

export const getNumFloat = () => {
  return Math.random().toFixed(1);
};

export const getUrl = () => {
  return "www.placeholer.com/" + Math.floor(Math.random() * 2 ** 48).toString(16);
};

const ovens: OvenType[] = ["gaz", "electrique"];
export const getOven = (): OvenType => {
  return ovens[Math.round(Math.random())];
};

export const interpolate = (time: number, points: TargetPoint[]): { temperature: number; oxygen: number } => {
  // find index for current time
  let idx = 1;
  for (; idx < points.length; idx++) {
    if (points[idx].time > time) break;
  }

  // calculate interpolation
  const pente = (points[idx].temperature - points[idx - 1].temperature) / (points[idx].time - points[idx - 1].time);
  const yOrigine = points[idx].temperature - pente * points[idx].time;

  return {
    temperature: time * pente + yOrigine,
    oxygen: points[idx].oxygen + Math.random() * 0.1 - 0.05,
  };
};
