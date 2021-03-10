import { CommandSubscribeResType, LiveSubscribeResType, TargetQueryResType } from "../types/APITypes";

export const isLiveSubscribeData = (data: any): data is LiveSubscribeResType => {
  return data?.live?.__typename === "LiveValues";
};

export const isTargetQueryRes = (data: any): data is TargetQueryResType => {
  return data?.targets?.__typename === "TargetQueryRes";
};

export const isCommandSubscribeRes = (data: any): data is CommandSubscribeResType => {
  return data?.command?.__typename === "Command";
};

export const isNumber = (data: any): data is number => {
  return typeof data === "number";
};
