const hours = (seconds: number, showZero: boolean): string => {
  const hours = Math.floor(seconds / (60 * 60)) % 24;
  return (showZero && hours < 10 ? "0" : "") + hours;
};

const minutes = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60) % 60;
  return (minutes < 10 ? "0" : "") + minutes;
};

export const graphFormatTime = (time: string | number, showMinutes: boolean): string => {
  const seconds = +time;
  return `${hours(seconds, false)}h${showMinutes ? minutes(seconds) : ""}`;
};

export const getHours = (millis: number): number => {
  return Math.floor(millis / (60 * 60 * 1000)) % 24;
};

export const getMinutes = (millis: number): number => {
  return Math.floor(millis / (60 * 1000)) % 60;
};
