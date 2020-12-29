import { Reference } from "../../sharedTypes/dbModelTypes";
import { GraphType } from "../../engine/graphMemory";
import { EngineState } from "../../engine/types";

export type ResType = {
  id: ResID;
  data?: ResDataType;
};

export enum ResID {
  success,
  error,
}

export type ResDataType = {
  state?: EngineState;
  ref?: Reference | "default";
  graphs?: GraphType[];
};
