import axios from "axios";
import { PostRequest, GetRequest } from "./queryFormat";

export const post = (req: PostRequest, callback: (res: any) => void): void => {
  const body = JSON.stringify(req);

  console.log("sending data");

  axios
    .post("http://localhost:3001/graph", { body })
    .then((res: any) => {
      const data = res.data;
      if (data.date) {
        data.date = new Date(data.date);
        data.lastUpdated = new Date(data.lastUpdated);
      } else {
        for (let d of data) {
          d.date = new Date(d.date);
          d.lastUpdated = new Date(d.lastUpdated);
        }
      }

      callback(data);
    })
    .catch((e: Error) => console.error(e));
};

export const get = (params: GetRequest, callback: (res: any) => void): void => {
  console.log("requesting data", params);

  axios
    .get("http://localhost:3001/graph", { params })
    .then((res: any) => {
      const data = res.data;
      if (data.date) {
        data.date = new Date(data.date);
        data.lastUpdated = new Date(data.lastUpdated);
      } else {
        for (let d of data) {
          d.date = new Date(d.date);
          d.lastUpdated = new Date(d.lastUpdated);
        }
      }

      callback(data);
    })
    .catch((e: Error) => console.error(e));
};
