import axios from "axios";
import { GraphGetRequest, GraphGetIdString } from "./types/getTypes";
import { GraphPostIdString, GraphPostRequest } from "./types/postTypes";
import { GraphResId } from "./types/resTypes";
import { Graph } from "@clientTypes/Graph";

export const post = async (req: GraphPostRequest): Promise<Graph[]> => {
  console.log("db post:", GraphPostIdString[req.id]);
  const body = JSON.stringify(req);

  return await axios
    .post("http://localhost:3001/graph", { body })
    .then((res: any) => {
      switch (+res.data.id) {
        case GraphResId.succes:
          return res.data.data;
        case GraphResId.error:
        default:
          throw new Error(res.data.data || res.data || "No answer");
      }
    })
    .catch((e: Error) => console.error(e));
};

export const get = async (req: GraphGetRequest): Promise<Graph[]> => {
  console.log("db get:", GraphGetIdString[req.id]);

  return await axios
    .get("http://localhost:3001/graph", { params: req })
    .then((res: any) => {
      switch (+res.data.id) {
        case GraphResId.succes:
          return res.data.data;
        case GraphResId.error:
        default:
          throw new Error(res.data.data || res.data || "No answer");
      }
    })
    .catch((e: Error) => console.error(e));
};
