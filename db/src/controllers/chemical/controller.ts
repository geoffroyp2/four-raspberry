import { Request, Response } from "express";
import { ChemicalDeleteFilter, ChemicalEditType, ChemicalFindFilter, ChemicalFindType } from "./types";
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
          const query: ChemicalFindFilter = JSON.parse(req.query.data as string);
          const result = await ChemicalModel.findOne(query).exec();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getMany: {
          const query: ChemicalFindType = JSON.parse(req.query.data as string);
          const result = await ChemicalModel.find(query).exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.getAll: {
          const result = await ChemicalModel.find().exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.deleteOne: {
          const query: ChemicalDeleteFilter = JSON.parse(req.query.data as string);
          await ChemicalModel.deleteOne(query).exec();
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
          const result = await ChemicalModel.updateChemical(body.data.id, body.data.filter);
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
