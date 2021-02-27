import { OvenType } from "../../database/models/target/target";
import TargetPoint from "../../database/models/target/targetPoints";

const possibleColors = [
  ["ff", "13", "13"],
  ["ff", "40", "10"],
  ["e9", "1e", "63"],
  ["9c", "27", "b0"],
  ["3f", "10", "b5"],
  ["03", "70", "f4"],
  ["00", "bc", "d4"],
  ["00", "74", "88"],
  ["3c", "af", "30"],
  ["cd", "dc", "39"],
  ["ff", "c1", "07"],
  ["98", "98", "98"],
];

const getNumHex = (input: string) => parseInt(input, 16);

export const getColor = () => {
  const color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
  return getNumHex(color[0]) + "-" + getNumHex(color[1]) + "-" + getNumHex(color[2]) + "-" + "0.9";
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

export const interpolate = (
  time: number,
  points: TargetPoint[],
  offset: number
): { temperature: number; oxygen: number } => {
  // find index for current time
  let idx = 1;
  for (; idx < points.length; idx++) {
    if (points[idx].time > time) break;
  }

  // calculate interpolation
  const pente = (points[idx].temperature - points[idx - 1].temperature) / (points[idx].time - points[idx - 1].time);
  const yOrigine = points[idx].temperature - pente * points[idx].time;

  return {
    temperature: time * pente + yOrigine + Math.random() * offset * Math.log(time || 1) + Math.random() * 15 - 8,
    oxygen: points[idx].oxygen + Math.random() * 0.1 - 0.05,
  };
};

export class Timer {
  now: Date = new Date();
  constructor() {}
  new() {
    const now = new Date();
    const interval = now.getTime() - this.now.getTime();
    this.now = now;
    return `${Math.floor(interval / 60000)}m ${Math.floor(interval / 1000) % 60}s ${interval % 1000}ms`;
  }
}
