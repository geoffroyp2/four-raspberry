import { ColorType } from "../schema/resolvers/sharedTypes";

/**
 * transforms a {r:255, g:255, b:255, a:1.0} color into a 255-255-255-1.0 color
 * @param color the ColorType input
 */
export const colorToString = (color: ColorType): string => {
  return `${getIntString(color.r)}-${getIntString(color.g)}-${getIntString(color.b)}-${getFloatString(color.a)}`;
};

/**
 * Returns a 3 characters string representation of a number between '000' and '255'
 * values are forced between 0 and 255
 * @param num the input number
 */
export const getIntString = (num: number): string => {
  return ("" + Math.floor(Math.min(Math.max(num, 0), 255))).padStart(3, "0");
};

/**
 * Returns a 3 characters string representation of a float between 0.0 and 1.0
 * values are forced between 0 and 1
 * @param num the input number
 */
export const getFloatString = (num: number): string => {
  return Math.min(Math.max(num, 0), 1).toFixed(1);
};

/**
 * transforms a 255-255-255-1.0 color into a {r:255, g:255, b:255, a:1.0} color
 * @param color the string color input
 */
export const stringToColor = (color: string): ColorType => {
  const splitString = color.split("-");
  return {
    r: +splitString[0],
    g: +splitString[1],
    b: +splitString[2],
    a: +splitString[3],
  };
};
