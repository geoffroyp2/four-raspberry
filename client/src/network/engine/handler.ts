import { get, post } from "./client";
import { EngineCommand, EngineGetId } from "./types/getTypes";
import { EnginePostId } from "./types/postTypes";

import { Graph } from "@clientTypes/Graph";
import { EngineStatus } from "@clientTypes/programInterfaces";

export default class engine {
  public static async ping(): Promise<boolean> {
    return get({ id: EngineGetId.ping }).then((data) => (data as EngineStatus).connected);
  }

  public static async getStatus(): Promise<EngineStatus> {
    return get({ id: EngineGetId.getStatus }).then((data) => data as EngineStatus);
  }

  public static async getGraph(): Promise<Graph> {
    return get({ id: EngineGetId.getTargetGraph }).then((data) => data as Graph);
  }

  public static async sendCommand(command: EngineCommand, param?: number): Promise<EngineStatus> {
    return get({ id: EngineGetId.command, data: param ? { command: command, param: param } : { command: command } }).then(
      (data) => data as EngineStatus
    );
  }

  public static async loadGraph(graph: Graph): Promise<EngineStatus> {
    return post({ id: EnginePostId.loadGraph, data: graph }).then((data) => data);
  }
}
