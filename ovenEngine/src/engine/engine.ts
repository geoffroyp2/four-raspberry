import emul from "../comEmulation/emul";
import { GQLMutation, GQLQuery, GQLSubscribe } from "../network/GQLClient";
import { getTargetQuery, getUpdateSensorsQuery, liveSubscriptionQuery } from "../utils/queries";
import WSINClient from "../network/WSINClient";
import WSOUTClient from "../network/WSOUTClient";
import { LiveStatusType, SensorValuesType, Target } from "../types/APITypes";
import { isLiveSubscribeData, isTargetQueryRes } from "../utils/typeCheck";

class Engine {
  // status from api
  private status: LiveStatusType = "stop";
  private target: Target = {};

  // connection instances
  private wsin: WSINClient;
  private wsout: WSOUTClient;

  // internal program variables
  private programStartTime: number = 0;
  private programRunTime: number = 0;
  private programPauseTime: number = 0;
  private lastPause: number = 0;
  private targetValues: SensorValuesType = {
    oxygen: 0,
    temperature: 0,
  };
  private sensorValues: SensorValuesType = {
    oxygen: 0,
    temperature: 0,
  };

  constructor() {
    GQLSubscribe(liveSubscriptionQuery, (data: any) => this.handleLiveUpdate(data));
    this.wsin = new WSINClient((data: any) => this.updateSensors(data));
    this.wsout = new WSOUTClient();
  }

  private async handleLiveUpdate(data: any) {
    if (isLiveSubscribeData(data)) {
      const newState = data.data.live;

      switch (newState.status) {
        case "start":
          this.start();
          break;
        case "pause":
          this.pause();
          break;
        case "stop":
          this.stop();
          break;
      }

      if (newState.currentTargetId !== this.target.id) {
        this.loadTarget(newState.currentTargetId);
      }
    }
  }

  public updateSensors(values: any) {
    console.log(values);
  }

  public async loadTarget(id: number) {
    const targetQueryRes = await GQLQuery(getTargetQuery(id));
    if (isTargetQueryRes(targetQueryRes.data)) {
      const results = targetQueryRes.data.targets.rows;
      if (results[0]) {
        this.target = results[0];
        console.log(`Loaded new target ${this.target.name} (id: ${this.target.id})`);
      } else {
        console.error("could not load target");
      }
    }
  }

  public run() {
    if (this.status === "start") {
      const now = new Date().getTime();
      this.programRunTime = now - this.programStartTime + this.programPauseTime; // TODO : mode not to count pause time

      // 1. calculate target temperature and send it to wsout
      this.refreshTargetValues();
      emul.sendTarget(this.targetValues);
      // this.wsout.sendTemperature(this.targetValues.temperature);

      // 2. send current sensor values from wsin to API
      this.sensorValues = emul.getSensorValues(this.programRunTime);
      GQLMutation(getUpdateSensorsQuery(this.sensorValues));
    }
  }

  private start() {
    if (this.status === "stop") {
      this.status = "start";
      this.programStartTime = new Date().getTime();
      this.programRunTime = 0;
      this.programPauseTime = 0;
      console.log("Program started");
    } else if (this.status === "pause") {
      // TODO: unpause
      this.status = "start";
      this.programPauseTime += new Date().getTime() - this.lastPause;
      console.log("Program unpaused");
    }
  }

  private pause() {
    if (this.status === "start") {
      // TODO: pause
      this.status = "pause";
      this.lastPause = new Date().getTime();
      console.log("Program paused");
    }
  }

  private stop() {
    if (this.status === "start" || this.status === "pause") {
      // TODO: stop
      this.status = "stop";
      console.log("Program stopped");
    }
  }

  public reconnect() {
    console.log("trying to reconnect...");
    this.wsin.connect();
    this.wsout.connect();
  }

  private refreshTargetValues() {
    if (this.target.points) {
      const points = this.target.points;
      const time = Math.floor(this.programRunTime / 1000); // in seconds

      // find index for current time
      let idx = 1;
      for (; idx < points.length; idx++) {
        if (points[idx].time > time) break;
      }

      // calculate interpolation
      const pente = (points[idx].temperature - points[idx - 1].temperature) / (points[idx].time - points[idx - 1].time);
      const yOrigine = points[idx].temperature - pente * points[idx].time;
      this.targetValues.temperature = time * pente + yOrigine;
    }
  }
}

export default Engine;
