import axios from "axios";

export const post = (req: any, callback: (res: any) => void): void => {
  const body = JSON.stringify(req);

  console.log("sending data");

  axios
    .post("http://localhost:3001/graph", { body })
    .then((res: any) => {
      callback(res.data);
    })
    .catch((e: Error) => console.error(e));
};

export const get = (
  params: { id: string; arg: string },
  callback: (res: any) => void
): void => {
  console.log("requesting data", params);

  axios
    .get("http://localhost:3001/graph", { params })
    .then((res: any) => {
      callback(res);
    })
    .catch((e: Error) => console.error(e));
};

// import { request } from "./request";
// import { IGraph } from "../../../db/src/models/graph/types";

// export const addData = (callback: (res: any) => void) => {
//   const onReceive = (res: any): void => {
//     console.log(res);
//     callback(res);
//   };

//   const data: IGraph[] = [...Array(10)].map((graph, graphIdx) => {
//     return {
//       name: `Graph #${graphIdx}`,
//       description: `Description for Graph #${graphIdx}`,
//       graphType: "model",
//       color: {
//         r: Math.random() * 255,
//         g: Math.random() * 255,
//         b: Math.random() * 255,
//         a: 0.9,
//       },
//       points: [...Array(120)].map((point, pointIdx) => {
//         return {
//           x: pointIdx * 1000 * 60 * 5, // 1 point toutes les 5 minutes
//           y:
//             pointIdx * (Math.random() * 0.2 + 1.9) +
//             pointIdx * (Math.random() * 0.2 + 1.9) * Math.log(pointIdx * 100) +
//             (Math.random() * 40 - 20),
//         };
//       }),
//     };
//   });

//   // post({ id: "add", data: data }, onReceive);
// };
