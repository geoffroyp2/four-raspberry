import axios from "axios";
import { ResID } from "@sharedTypes/dbAPITypes";

export const post = async <T>(req: any, route: string): Promise<T[]> => {
  const body = JSON.stringify(req);
  console.log("post", req);

  return await axios
    .post(`http://localhost:3001/${route}`, { body })
    .then((res) => {
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

export const get = async <T>(req: any, route: string): Promise<T[]> => {
  console.log("get", req);

  return await axios
    .get(`http://localhost:3001/${route}`, { params: req })
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
