// import { Request, Response } from "express";
// import { GraphModel } from "../../models/graph/model";
// import { GraphGetId, GraphGetIdString, GraphGetRequest } from "./types/getTypes";
// import { GraphPostRequest, GraphPostId, GraphPostIdString } from "./types/postTypes";
// import { GraphResId } from "./types/resTypes";

// export default class GraphController {
//   public async get(req: Request, res: Response): Promise<void> {
//     const query: GraphGetRequest = {
//       id: +req.query.id,
//       data: req.query.data && { ...JSON.parse(req.query.data as string) },
//     };

//     console.log("Get: ", GraphGetIdString[query.id]);

//     try {
//       switch (query.id as GraphGetId) {
//         case GraphGetId.getOne: {
//           const result = await GraphModel.findOne(query.data).exec();
//           res.json({ id: GraphResId.succes, data: [result] });
//           break;
//         }
//         case GraphGetId.getMany: {
//           const result = await GraphModel.find(query.data).exec();
//           res.json({ id: GraphResId.succes, data: result });
//           break;
//         }
//         case GraphGetId.getAll: {
//           const result = await GraphModel.find().exec();
//           res.json({ id: GraphResId.succes, data: result });
//           break;
//         }
//         case GraphGetId.createOne: {
//           const result = await (await GraphModel.createNewGraph()).execPopulate();
//           res.json({ id: GraphResId.succes, data: [result] });
//           break;
//         }
//         case GraphGetId.deleteOne: {
//           const result = await GraphModel.deleteOne(query.data).exec();
//           res.json({ id: GraphResId.succes, data: null });
//           break;
//         }
//         default:
//           res.json({ id: GraphResId.error, data: "bad id" });
//           break;
//       }
//     } catch (e) {
//       console.error(e);
//       res.json({ id: GraphResId.error, data: "communication error" });
//     }
//   }

//   public async post(req: Request, res: Response): Promise<void> {
//     const body: GraphPostRequest = JSON.parse(req.body.body);

//     try {
//       switch (body.id) {
//         case GraphPostId.updateOne: {
//           const updatedGraph = await GraphModel.updateGraph(body.data);
//           console.log(`Updated "${updatedGraph.name}"`);
//           res.json({ id: GraphResId.succes, data: [updatedGraph] });
//           break;
//         }
//         default:
//           res.json({ id: GraphResId.error, data: "no data" });
//           break;
//       }
//     } catch (e) {
//       console.error(e);
//       res.json({ id: GraphResId.error, data: "communication error" });
//     }
//   }
// }
