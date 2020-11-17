export const formatTime = (time: string, showMinutes: boolean): string => {
  const millis = +time;
  //   const seconds = Math.floor(millis / 1000) % 60;
  const minutes = Math.floor(millis / (60 * 1000)) % 60;
  const hours = Math.floor(millis / (60 * 60 * 1000)) % 24;

  return `${hours}h${
    showMinutes ? (minutes < 10 ? "0" + minutes : minutes) : ""
  }`;
};

export const getHours = (millis: number): number => {
  return Math.floor(millis / (60 * 60 * 1000)) % 24;
};
export const getMinutes = (millis: number): number => {
  return Math.floor(millis / (60 * 1000)) % 60;
};
export const getMillis = (hours: number, minutes: number): number => {
  return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
};

export const formatDate = (date: Date | undefined): string => {
  const addZero = (val: number): string => {
    return val < 10 ? "0" + val : "" + val;
  };

  return date
    ? `${date.getDate()}/${addZero(
        date.getMonth() + 1
      )}/${date.getFullYear()} - ${date.getHours()}:${addZero(
        date.getMinutes()
      )}`
    : "-";
};
