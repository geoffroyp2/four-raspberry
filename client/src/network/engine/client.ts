import axios from "axios";

import { ReqType } from "./types/reqType";
import { ResDataType, ResID } from "./types/resType";

export const post = async (req: ReqType): Promise<ResDataType> => {
  console.log("engine post");
  const body = JSON.stringify(req);

  return await axios
    .post("http://localhost:3002/engine", { body })
    .then((res: any) => {
      switch (+res.data.id) {
        case ResID.success:
          return res.data.data;
        case ResID.error:
        default:
          throw new Error(res.data.data || res.data || "No answer");
      }
    })
    .catch((e: Error) => console.error(e));
};

export const get = async (req: ReqType): Promise<ResDataType> => {
  console.log("engine get");

  return await axios
    .get("http://localhost:3002/engine", { params: req })
    .then((res: any) => {
      switch (+res.data.id) {
        case ResID.success:
          return res.data.data;
        case ResID.error:
        default:
          throw new Error(res.data.data || res.data || "No answer");
      }
    })
    .catch((e: Error) => console.error(e));
};
