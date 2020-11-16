export const formatTime = (time: string): string => {
  const millis = +time;
  //   const seconds = Math.floor(millis / 1000) % 60;
  const minutes = Math.floor(millis / (60 * 1000)) % 60;
  const hours = Math.floor(millis / (60 * 60 * 1000)) % 24;

  return `${hours}h${minutes < 10 ? "0" + minutes : minutes}`;
};

export const formatDate = (date: Date | undefined): string => {
  return date
    ? `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    : "-";
};
