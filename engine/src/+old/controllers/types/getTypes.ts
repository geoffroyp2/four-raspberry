export const EngineGetIdString = ["Ping", "Get status", "Get target graph", "Command"];

export enum EngineGetId {
  ping,
  getStatus,
  getTargetGraph,
  command,
}

export enum EngineCommand {
  start,
  stop,
  pause,
  restart,
  valve,
}

export interface EngineCommandData {
  command: EngineCommand;
  param?: {};
}

export type EngineGetRequest =
  | {
      id: EngineGetId.ping | EngineGetId.getStatus | EngineGetId.getTargetGraph;
    }
  | {
      id: EngineGetId.command;
      data: EngineCommandData;
    };
