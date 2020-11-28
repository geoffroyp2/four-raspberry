import axios from "axios";
import { EngineGetRequest, EngineGetIdString } from "./types/getTypes";
import { EnginePostIdString, EnginePostRequest } from "./types/postTypes";
import { EngineResId } from "./types/resTypes";
import { EngineStatus } from "@clientTypes/programInterfaces";
import { Graph } from "@clientTypes/Graph";

export const post = async (req: EnginePostRequest): Promise<EngineStatus> => {
  console.log("engine post:", EnginePostIdString[req.id]);
  const body = JSON.stringify(req);

  return await axios
    .post("http://localhost:3002/engine", { body })
    .then((res: any) => {
      switch (+res.data.id) {
        case EngineResId.succes:
          return res.data.data;
        case EngineResId.error:
        default:
          throw new Error(res.data.data || res.data || "No answer");
      }
    })
    .catch((e: Error) => console.error(e));
};

export const get = async (req: EngineGetRequest): Promise<EngineStatus | Graph> => {
  console.log("engine get:", EngineGetIdString[req.id]);

  return await axios
    .get("http://localhost:3002/engine", { params: req })
    .then((res: any) => {
      switch (+res.data.id) {
        case EngineResId.succes:
          return res.data.data;
        case EngineResId.error:
        default:
          throw new Error(res.data.data || res.data || "No answer");
      }
    })
    .catch((e: Error) => console.error(e));
};
