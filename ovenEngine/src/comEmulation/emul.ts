import { SensorValuesType } from "../types/APITypes";

class Emul {
  private targetValues: SensorValuesType = {
    oxygen: 0,
    temperature: 0,
  };

  sendTarget(values: SensorValuesType) {
    this.targetValues = { ...values };
  }
  getSensorValues(time: number): SensorValuesType {
    const { oxygen, temperature } = this.targetValues;
    const mult = time / 1000 / 40500;
    return {
      oxygen: oxygen + Math.random() * 0.2 - 0.1,
      temperature: temperature + Math.random() * 50 * mult - 25 * mult,
    };
  }
}

export default new Emul();
