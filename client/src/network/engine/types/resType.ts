import { Reference } from "@sharedTypes/dbModelTypes";
import { EngineState, GraphType } from "@sharedTypes/engineTypes";

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
