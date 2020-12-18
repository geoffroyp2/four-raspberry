const hours = (millis: number, showZero: boolean): string => {
  const hours = Math.floor(millis / (60 * 60 * 1000)) % 24;
  return (showZero && hours < 10 ? "0" : "") + hours;
};

const minutes = (millis: number): string => {
  const minutes = Math.floor(millis / (60 * 1000)) % 60;
  return (minutes < 10 ? "0" : "") + minutes;
};

export const graphFormatTime = (time: string | number, showMinutes: boolean): string => {
  const millis = +time;
  return `${hours(millis, false)}h${showMinutes ? minutes(millis) : ""}`;
};

// export const getTimeInputString = (millis: number): string => {
//   return `${hours(millis, true)}:${minutes(millis)}`;
// };

// export const getTimeInputMillis = (time: string): number => {
//   const hours = +time.substr(0, 2);
//   const minutes = +time.substr(3, 2);
//   return getMillis(hours, minutes);
// };

export const getHours = (millis: number): number => {
  return Math.floor(millis / (60 * 60 * 1000)) % 24;
};

export const getMinutes = (millis: number): number => {
  return Math.floor(millis / (60 * 1000)) % 60;
};

// export const getMillis = (hours: number, minutes: number): number => {
//   return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
// };
