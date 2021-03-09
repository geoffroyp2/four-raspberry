import { LiveSubscribeResType, TargetQueryResType } from "../types/APITypes";

export const isLiveSubscribeData = (data: any): data is LiveSubscribeResType => {
  return data?.data?.live?.__typename === "LiveValues";
};

export const isTargetQueryRes = (data: any): data is TargetQueryResType => {
  return data?.targets?.__typename === "TargetQueryRes";
};
