import { Request, Response } from "express";
import { ReferenceDeleteType, ReferenceEditType, ReferenceFindType } from "./types";
import { ReqID } from "../shared/reqTypes";
import { ResID } from "../shared/resTypes";
import { ReferenceModel } from "../../models/reference/model";

export default class ReferenceController {
  public async get(req: Request, res: Response): Promise<void> {
    console.log("Reference get");

    try {
      switch (+req.query.id) {
        case ReqID.createOne: {
          const result = await (await ReferenceModel.createReference()).execPopulate();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getOne: {
          const query: ReferenceFindType = JSON.parse(req.query as any);
          const result = await ReferenceModel.findOne(query.data).exec();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getMany: {
          const query: ReferenceFindType = JSON.parse(req.query as any);
          const result = await ReferenceModel.find(query.data).exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.getAll: {
          const result = await ReferenceModel.find().exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.deleteOne: {
          const query: ReferenceDeleteType = JSON.parse(req.query as any);
          await ReferenceModel.deleteOne(query.data).exec();
          res.json({ id: ResID.success, data: [] });
          break;
        }
        default:
          res.json({ id: ResID.error, data: "bad id" });
          break;
      }
    } catch (e) {
      console.error(e);
      res.json({ id: ResID.error, data: "communication error" });
    }
  }
  public async post(req: Request, res: Response): Promise<void> {
    console.log("Reference post");

    const body: ReferenceEditType = JSON.parse(req.body.body);

    try {
      switch (body.id) {
        case ReqID.updateOne: {
          const result = await ReferenceModel.updateReference(body.data);
          //   console.log(`Updated "${updatedGraph.name}"`);
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        default:
          res.json({ id: ResID.error, data: "no data" });
          break;
      }
    } catch (e) {
      console.error(e);
      res.json({ id: ResID.error, data: "communication error" });
    }
  }
}
