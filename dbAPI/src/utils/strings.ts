type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export const colorToString = (color: Color): string => {
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
