import { Reference } from "@sharedTypes/dbModelTypes";
import { EngineState, GraphType } from "@sharedTypes/engineTypes";
import { get, post } from "./client";
import { ReqID } from "./types/reqType";

export default class engine {
  public static loadReference = async (ref: Reference): Promise<Reference | "default" | null> => {
    const data = await post({ id: ReqID.loadRef, data: { reference: ref } });
    return data.ref ?? null;
  };

  public static getReference = async (): Promise<Reference | "default" | null> => {
    const data = await get({ id: ReqID.getRef });
    return data.ref ?? null;
  };

  public static getState = async (): Promise<EngineState | null> => {
    const data = await get({ id: ReqID.getState });
    return data.state ?? null;
  };

  public static getGraphs = async (): Promise<GraphType[] | null> => {
    const data = await get({ id: ReqID.getGraphs });
    return data.graphs ?? null;
  };

  public static start = async (): Promise<EngineState | null> => {
    const data = await get({ id: ReqID.start });
    return data.state ?? null;
  };

  public static stop = async (): Promise<EngineState | null> => {
    const data = await get({ id: ReqID.stop });
    return data.state ?? null;
  };

  public static pause = async (): Promise<EngineState | null> => {
    const data = await get({ id: ReqID.pause });
    return data.state ?? null;
  };

  public static unpause = async (): Promise<EngineState | null> => {
    const data = await get({ id: ReqID.unpause });
    return data.state ?? null;
  };

  public static reconnect = async (): Promise<void> => {
    await get({ id: ReqID.reconnect });
  };

  public static ping = async (): Promise<boolean> => {
    // TODO
    await get({ id: ReqID.ping });
    return true;
  };
}

/*
  ping,
  start,
  stop,
  pause,
  unpause,
  getState,
  loadRef,
  getRef,
*/
