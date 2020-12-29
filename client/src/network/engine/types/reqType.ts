import { Reference } from "@sharedTypes/dbModelTypes";

export enum ReqID {
  ping,
  start,
  stop,
  pause,
  unpause,
  getState,
  loadRef,
  getRef,
  getGraphs,
}

export type ReqType = {
  id: ReqID;
  data?: ReqDataType;
};

export type ReqDataType = {
  reference: Reference;
};
