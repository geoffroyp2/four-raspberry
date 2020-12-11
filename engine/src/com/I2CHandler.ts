import { Command, SensorValues } from "./comFormat";

// For now: only a simulation, need to implement the real i2c interface on the raspberry

const rasp = (callback: () => void) => {
  setTimeout(callback, Math.random() * 40 + 20);
};

export default class i2c {
  private static targetTemp: number = 0;

  public static begin(callback: (res: boolean) => void) {
    rasp(() => callback(true));
  }

  public static ping(callback: (res: boolean) => void) {
    rasp(() => callback(true));
  }

  public static send(com: Command, param: number, callback: () => void): void {
    switch (com) {
      case Command.target:
        this.targetTemp = param!;
        break;
      default:
        break;
    }
    rasp(() => callback());
  }

  public static request(callback: (val: SensorValues) => void): void {
    rasp(() =>
      callback({
        temp: this.targetTemp + Math.random() * 30 - 5,
        oxy: Math.random() * 0.7 + 0.15,
      })
    );
  }
}
