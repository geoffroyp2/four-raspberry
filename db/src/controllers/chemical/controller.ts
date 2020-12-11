import { Request, Response } from "express";
import { ChemicalDeleteType, ChemicalEditType, ChemicalFindType } from "./types";
import { ReqID } from "../shared/reqTypes";
import { ResID } from "../shared/resTypes";
import { ChemicalModel } from "../../models/chemical/model";

export default class ChemicalController {
  public async get(req: Request, res: Response): Promise<void> {
    console.log("Chemical get");

    try {
      switch (+req.query.id) {
        case ReqID.createOne: {
          const result = await (await ChemicalModel.createChemical()).execPopulate();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getOne: {
          const query: ChemicalFindType = JSON.parse(req.query as any);
          const result = await ChemicalModel.findOne(query.data).exec();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getMany: {
          const query: ChemicalFindType = JSON.parse(req.query as any);
          const result = await ChemicalModel.find(query.data).exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.getAll: {
          const result = await ChemicalModel.find().exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.deleteOne: {
          const query: ChemicalDeleteType = JSON.parse(req.query as any);
          await ChemicalModel.deleteOne(query.data).exec();
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
    console.log("Chemical post");

    const body: ChemicalEditType = JSON.parse(req.body.body);

    try {
      switch (body.id) {
        case ReqID.updateOne: {
          const result = await ChemicalModel.updateChemical(body.data);
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
