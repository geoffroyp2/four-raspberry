import axios from "axios";
import { PostRequest, GetRequest } from "./graphQueryFormat";

export const post = (req: PostRequest, callback: (res: any) => void): void => {
  const body = JSON.stringify(req);

  console.log("sending data");

  axios
    .post("http://localhost:3001/graph", { body })
    .then((res: any) => {
      callback(res.data);
    })
    .catch((e: Error) => console.error(e));
};

export const get = (params: GetRequest, callback: (res: any) => void): void => {
  console.log("requesting data", params);

  axios
    .get("http://localhost:3001/graph", { params })
    .then((res: any) => {
      callback(res.data);
    })
    .catch((e: Error) => console.error(e));
};
