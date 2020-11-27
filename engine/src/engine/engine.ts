import { SensorValues } from "./types";

class Engine {
  public start(): void {}
  public pause(): void {}
  public stop(): void {}
  public ping(): void {}
  public getSensorValues(): SensorValues {
    return { oxy: 20, temp: 40 };
  }
}

export default new Engine();
