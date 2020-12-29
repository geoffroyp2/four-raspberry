import { Request, Response } from "express";
import { RecordEditType, RecordFindFilter } from "./types";
import { ReqID } from "../shared/reqTypes";
import { ResID } from "../shared/resTypes";
import { RecordModel } from "../../models/record/model";

export default class RecordController {
  public async get(req: Request, res: Response): Promise<void> {
    console.log("Record get");

    try {
      switch (+req.query.id) {
        case ReqID.createOne: {
          const result = await (await RecordModel.createRecord()).execPopulate();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getOne: {
          const query: RecordFindFilter = JSON.parse(req.query.data as string);
          const result = await RecordModel.findOne(query).exec();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getMany: {
          const query: RecordFindFilter = JSON.parse(req.query.data as string);
          const result = await RecordModel.find(query).exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.getAll: {
          const result = await RecordModel.find().exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.deleteOne: {
          const query: RecordFindFilter = JSON.parse(req.query.data as string);
          await RecordModel.deleteOne(query).exec();
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
    console.log("Record post");

    const body: RecordEditType = JSON.parse(req.body.body);

    try {
      switch (body.id) {
        case ReqID.updateOne: {
          const result = await RecordModel.updateRecord(body.data.id, body.data.filter);
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
