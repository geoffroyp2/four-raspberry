import { WSINClient } from "../com/wsCom/WSINClient";
import { WSOUTClient } from "../com/wsCom/WSOUTClient";

import { Reference } from "../sharedTypes/dbModelTypes";
import { emptyValues, EngineState, EngineStatusType, ValuesType } from "./types";

import { ReferenceHandler } from "./referenceHandler";
import graphMemory from "./graphMemory";

export class Engine {
  private WSIN: WSINClient;
  private WSOUT: WSOUTClient;
  private refH: ReferenceHandler | null;

  public status: EngineStatusType = "stop";
  public values: ValuesType = emptyValues;

  private loopInterval: number = 2000; // main loop interval in ms
  private programStartTime: number = 0; // absolute start date
  private programPauseTime: number = 0; // total pause time
  private programRunTime: number = 0; // total run time
  private lastPause: number = 0; // absolute date for last pause

  constructor() {
    this.WSIN = new WSINClient((values) => {
      console.log(values);
      this.values.sensor = values;
    });
    this.WSIN.connect();

    this.WSOUT = new WSOUTClient();
    this.WSOUT.connect();

    graphMemory.reset();
  }

  public loadRef(ref: Reference) {
    this.refH = new ReferenceHandler(ref);
  }

  public getRef() {
    return this.refH?.ref ?? "default";
  }

  public ping(): boolean {
    return this.WSIN.getStatus() && this.WSOUT.getStatus();
  }

  public getState(): EngineState {
    if (this.refH) this.values.target.temperature = this.refH.targetTemp;
    return {
      values: this.values,
      status: this.status,
      refID: this.refH?.ref._id ?? "default",
      times: {
        start: this.programStartTime,
        totalRun: this.programRunTime,
        totalPause: this.programPauseTime,
      },
    };
  }

  public getGraphs() {
    return graphMemory.getGraphs();
  }

  public start() {
    if (this.refH && this.status === "stop") {
      graphMemory.reset();
      this.programRunTime = 0;
      this.programPauseTime = 0;
      this.programStartTime = new Date().getTime();
      this.status = "run";

      console.log("Program Started");

      this.run();
    }
  }

  public stop() {
    if (this.status === "run" || this.status === "pause") {
      this.status = "stop";

      console.log("Program Stopped");
    }
  }

  public pause() {
    if (this.status === "run") {
      this.lastPause = new Date().getTime();
      this.status = "pause";

      console.log("Program Paused");
    }
  }

  public unpause() {
    if (this.status === "pause") {
      // add pause time
      this.programPauseTime += new Date().getTime() - this.lastPause;
      this.status = "run";

      console.log("Program Unpaused");

      this.run();
    }
  }

  private run() {
    if (this.status === "run") {
      setTimeout(() => {
        const now = new Date().getTime();
        this.programRunTime = now - this.programStartTime + this.programPauseTime; // TODO : mode not to count pause time

        this.refH.refreshTargetTemp(this.programRunTime);
        this.WSOUT.sendTemperature(this.refH.targetTemp);
        graphMemory.addValue(this.programRunTime, this.refH.targetTemp);
        if (this.status === "run") this.run(); // another check if paused/stopped in-between
      }, this.loopInterval);
    }
  }
}

export default new Engine();
