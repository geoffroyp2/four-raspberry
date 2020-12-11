import { EngineCommand, EngineCommandData } from "../controllers/types/getTypes";
import { emptyGraph, EngineStatus, Graph } from "./types";

class Engine {
  // Internal state
  private runStatus: EngineStatus["runStatus"] = "stop";
  private driverMode: EngineStatus["driverMode"] = "auto";
  private connected: boolean = true;
  private sensorValues: EngineStatus["sensors"] = { temp: -1, oxy: -1 };
  private targetValues: EngineStatus["target"] = { temp: -1, oxy: -1 };
  private valveValues: EngineStatus["valves"] = { angle: 90 };
  private targetGraph: Graph = emptyGraph;

  // Access from controller
  public load(data: Graph): void {
    this.targetGraph = data;
  }

  public command(data: EngineCommandData): void {
    switch (data.command) {
      case EngineCommand.start:
        this.start();
        break;
      case EngineCommand.pause:
        this.pause();
        break;
      case EngineCommand.stop:
        this.stop();
        break;
      case EngineCommand.restart:
        this.restart();
        break;
      case EngineCommand.valve:
        data.param ? this.controlValve(data.param) : console.error("Valve control error: need Argument");
        break;
      default:
        console.error("bad command ID");
        break;
    }
  }

  public ping(): void {}

  get status(): EngineStatus {
    return {
      runStatus: this.runStatus,
      driverMode: this.driverMode,
      connected: this.connected,
      targetGraphID: this.targetGraph._id,
      sensors: { ...this.sensorValues },
      target: { ...this.targetValues },
      valves: { ...this.valveValues },
    };
  }

  get graph(): Graph {
    return this.targetGraph;
  }

  // private methods
  private start(): void {
    this.runStatus = "run";
  }

  private pause(): void {
    this.runStatus = "pause";
  }

  private stop(): void {
    this.runStatus = "stop";
  }

  private restart(): void {}

  private controlValve(param: EngineCommandData["param"]): void {}
}

export default new Engine();
