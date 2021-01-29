import { OvenType } from "../../database/models/target/target";

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
