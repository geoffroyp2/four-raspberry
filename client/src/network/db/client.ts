import { ResDataType } from "@sharedTypes/dbAPITypes";
import axios from "axios";

export const post = async (req: any, route: string): Promise<ResDataType> => {
  console.log("post", req);
  const body = JSON.stringify(req);

  return await axios
    .post(`http://localhost:3001/${route}`, { body })
    .then((res: any) => res.data)
    .catch((e: Error) => console.error(e));
};

export const get = async (req: any, route: string): Promise<ResDataType> => {
  console.log("get", req);

  return await axios
    .get(`http://localhost:3001/${route}`, { params: req })
    .then((res: any) => res.data)
    .catch((e: Error) => console.error(e));
};
