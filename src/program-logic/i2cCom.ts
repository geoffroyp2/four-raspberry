// Empty for now.
// Need to build it on the raspberry

import { SensorValues } from "../interfaces/programInterfaces";

export class i2cCom {
  comAdress: number = 0x20;

  // temp for testing
  targetValues: SensorValues | null = null;

  setAdress(newAdress: number): void {
    this.comAdress = newAdress;
  }

  begin(): void {}

  ping(): boolean {
    return true;
  }

  sendTargetValues(targetValues: SensorValues): void {
    this.targetValues = targetValues;
  }

  requestSensorValues(): SensorValues {
    console.log("sensor sending values");

    return {
      temp: this.targetValues!.temp + Math.random() * 40 - 20,
      oxy: this.targetValues!.oxy + Math.random() * 10 - 5,
    };
  }
}

const com = new i2cCom();
export default com;
