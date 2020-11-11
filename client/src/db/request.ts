import axios from "axios";

export const request = (req: any, callback: (res: any) => void): void => {
  const body = JSON.stringify(req);

  axios
    .post("http://localhost:3001/graph", { body })
    .then((res: any) => {
      callback(res.data);
    })
    .catch((e: Error) => console.error(e));
};
