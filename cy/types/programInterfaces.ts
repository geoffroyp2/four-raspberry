export interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface EngineStatus {
  runStatus: "run" | "pause" | "stop";
  driverMode: "auto" | "manual";
  connected: boolean;
  targetGraphID: string;
  sensors: {
    temp: number;
    oxy: number;
  };
  target: {
    temp: number;
    oxy: number;
  };
  valves: {
    angle: number;
  };
}
