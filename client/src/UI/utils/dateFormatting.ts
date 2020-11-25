const addZero = (val: number): string => {
  return val < 10 ? "0" + val : "" + val;
};

export const dateToDisplayString = (dateString: string | undefined, showTime: boolean): string => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const dateStr = `${date.getDate()}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`;
  const timeStr = `${date.getHours()}:${addZero(date.getMinutes())}`;
  return dateStr + (showTime ? " - " + timeStr : "");
};

export const dateToInputFormat = (ISOString: string): string => {
  if (!ISOString) return "-";

  const date = new Date(ISOString);
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${date.getDate()}`;
};

export const dateToISOString = (inputString: string): string => {
  // TODO: add time ? (defaults to 00:00)
  return new Date(inputString).toISOString();
};
