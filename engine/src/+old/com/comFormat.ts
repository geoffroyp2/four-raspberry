export enum Command {
  ping = 1,
  start,
  stop,
  target,
}

export interface SensorValues {
  temp: number;
  oxy: number;
}
